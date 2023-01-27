import type { IBuffer } from 'src/types'
import ByteBuffer from 'src/util/ByteBuffer'

class TokenInfoDictionary {
  dictionary: ByteBuffer
  target_map: Record<number, any>
  pos_buffer: ByteBuffer
  constructor() {
    this.dictionary = new ByteBuffer(10 * 1024 * 1024)
    this.target_map = {} // trie_isd (of surface form) -> token_info_id (of token)
    this.pos_buffer = new ByteBuffer(10 * 1024 * 1024)
  }

  loadDictionary(array_buffer: IBuffer) {
    this.dictionary = new ByteBuffer(array_buffer)
    return this
  }

  loadPosVector(array_buffer: IBuffer) {
    this.pos_buffer = new ByteBuffer(array_buffer)
    return this
  }

  loadTargetMap(array_buffer: IBuffer) {
    const buffer = new ByteBuffer(array_buffer)
    buffer.position = 0
    this.target_map = {}
    buffer.readInt() // map_keys_size
    while (true) {
      if (buffer.buffer.length < buffer.position + 1)
        break

      const key = buffer.readInt()
      const map_values_size = buffer.readInt()
      for (let i = 0; i < map_values_size; i++) {
        const value = buffer.readInt()
        this.addMapping(key, value)
      }
    }
    return this
  }

  addMapping(source: number, target: number) {
    let mapping = this.target_map[source]
    if (mapping == null)
      mapping = []

    mapping.push(target)

    this.target_map[source] = mapping
  }
}
export default TokenInfoDictionary
