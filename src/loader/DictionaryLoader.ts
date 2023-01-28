import fs from 'fs'
import node_zlib from 'zlib'
import path from 'path'
import async from 'async'
import DynamicDictionaries from '../dict/DynamicDictionaries'

class DictionaryLoader {
  dic_path: string
  dic: DynamicDictionaries
  constructor(dic_path: string) {
    this.dic = new DynamicDictionaries()
    this.dic_path = dic_path
  }

  load(load_callback: { (err: any, dic: any): void; (arg0: Error | null | undefined, arg1: DynamicDictionaries): void }) {
    const dic = this.dic
    const dic_path = this.dic_path
    const loadArrayBuffer = this.loadArrayBuffer

    async.parallel([
      // Trie
      function (callback) {
        async.map(['base.dat.gz', 'check.dat.gz'], (filename, _callback) => {
          return loadArrayBuffer(path.join(dic_path, filename), (err, buffer) => {
            if (err)
              return _callback(err)
            _callback(null, buffer)
          })
        }, (err, buffers) => {
          if (err)
            return callback(err)

          const base_buffer = new Int32Array(buffers![0] as number)
          const check_buffer = new Int32Array(buffers![1] as number)

          dic.loadTrie(base_buffer, check_buffer)
          callback(null)
        })
      },
      // Token info dictionaries
      function (callback) {
        async.map(['tid.dat.gz', 'tid_pos.dat.gz', 'tid_map.dat.gz'], (filename, _callback) => {
          loadArrayBuffer(path.join(dic_path, filename), (err, buffer) => {
            if (err)
              return _callback(err)

            _callback(null, buffer)
          })
        }, (err, buffers) => {
          if (err)
            return callback(err)

          const token_info_buffer = new Uint8Array(buffers![0] as number)
          const pos_buffer = new Uint8Array(buffers![1] as number)
          const target_map_buffer = new Uint8Array(buffers![2] as number)

          dic.loadTokenInfoDictionaries(token_info_buffer, pos_buffer, target_map_buffer)
          callback(null)
        })
      },
      // Connection cost matrix
      function (callback) {
        loadArrayBuffer(path.join(dic_path, 'cc.dat.gz'), (err, buffer: any) => {
          if (err)
            return callback(err)

          const cc_buffer = new Int16Array(buffer)
          dic.loadConnectionCosts(cc_buffer)
          callback(null)
        })
      },
      // Unknown dictionaries
      function (callback) {
        async.map(['unk.dat.gz', 'unk_pos.dat.gz', 'unk_map.dat.gz', 'unk_char.dat.gz', 'unk_compat.dat.gz', 'unk_invoke.dat.gz'], (filename, _callback) => {
          loadArrayBuffer(path.join(dic_path, filename), (err, buffer) => {
            if (err)
              return _callback(err)

            _callback(null, buffer)
          })
        }, (err, buffers) => {
          if (err)
            return callback(err)

          const unk_buffer = new Uint8Array(buffers![0] as number)
          const unk_pos_buffer = new Uint8Array(buffers![1] as number)
          const unk_map_buffer = new Uint8Array(buffers![2] as number)
          const cat_map_buffer = new Uint8Array(buffers![3] as number)
          const compat_cat_map_buffer = new Uint32Array(buffers![4] as number)
          const invoke_def_buffer = new Uint8Array(buffers![5] as number)

          dic.loadUnknownDictionaries(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer)
          // dic.loadUnknownDictionaries(char_buffer, unk_buffer);
          callback(null)
        })
      },
    ], (err) => {
      load_callback(err, dic)
    })
  }

  loadArrayBuffer(
    file: fs.PathOrFileDescriptor,
    callback: (arg: Error | NodeJS.ErrnoException | null, arg2?: ArrayBufferLike) => void) {
    fs.readFile(file, (err, buffer) => {
      if (err)
        return callback(err)
      node_zlib.gunzip(buffer, (err2, decompressed) => {
        if (err2)
          return callback(err2)
        const typed_array = new Uint8Array(decompressed)
        callback(null, typed_array.buffer)
      })
    })
  }
}

export default DictionaryLoader
