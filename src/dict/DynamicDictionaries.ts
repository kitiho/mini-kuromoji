import doublearray from 'doublearray'
import type { IBuffer } from 'src/types'
import ConnectionCosts from './ConnectionCosts'
import TokenInfoDictionary from './TokenInfoDictionary'
import UnknownDictionary from './UnknownDictionary'

class DynamicDictionaries {
  trie: doublearray.DoubleArray
  token_info_dictionary: TokenInfoDictionary
  connection_costs: ConnectionCosts
  unknown_dictionary: UnknownDictionary

  constructor(
    trie?: any | null | undefined,
    token_info_dictionary?: any,
    connection_costs?: any,
    unknown_dictionary?: any) {
    this.trie = trie ?? doublearray.builder(0).build([
      { k: '', v: 1 },
    ])
    this.token_info_dictionary = token_info_dictionary ?? new TokenInfoDictionary()
    this.connection_costs = connection_costs ?? new ConnectionCosts(0, 0)
    this.unknown_dictionary = unknown_dictionary ?? new UnknownDictionary()
  }

  loadTrie(base_buffer: any, check_buffer: any) {
    this.trie = doublearray.load(base_buffer, check_buffer)
    return this
  }

  loadTokenInfoDictionaries(token_info_buffer: IBuffer, pos_buffer: IBuffer, target_map_buffer: IBuffer) {
    this.token_info_dictionary.loadDictionary(token_info_buffer)
    this.token_info_dictionary.loadPosVector(pos_buffer)
    this.token_info_dictionary.loadTargetMap(target_map_buffer)
    return this
  }

  loadUnknownDictionaries(unk_buffer: IBuffer, unk_pos_buffer: IBuffer, unk_map_buffer: IBuffer, cat_map_buffer: IBuffer, compat_cat_map_buffer: IBuffer, invoke_def_buffer: IBuffer) {
    this.unknown_dictionary.loadUnknownDictionaries(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer)
    return this
  }

  loadConnectionCosts(cc_buffer: Int16Array) {
    this.connection_costs.loadConnectionCosts(cc_buffer)
    return this
  }
}

export default DynamicDictionaries
