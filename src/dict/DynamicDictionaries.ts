import doublearray from 'doublearray'
import ConnectionCosts from './ConnectionCosts'
import TokenInfoDictionary from './TokenInfoDictionary'
import UnknownDictionary from './UnknownDictionary'

class DynamicDictionaries {
  trie: doublearray.DoubleArray
  token_info_dictionary: TokenInfoDictionary
  connection_costs: ConnectionCosts
  unknown_dictionary: UnknownDictionary

  constructor(
    trie?: null | undefined,
    token_info_dictionary?: undefined,
    connection_costs?: undefined,
    unknown_dictionary?: undefined) {
    this.trie = trie ?? doublearray.builder(0).build([
      { k: '', v: 1 },
    ])
    this.token_info_dictionary = token_info_dictionary ?? new TokenInfoDictionary()
    this.connection_costs = connection_costs ?? new ConnectionCosts(0, 0)
    this.unknown_dictionary = unknown_dictionary ?? new UnknownDictionary()
  }

  loadTrie(base_buffer, check_buffer) {
    this.trie = doublearray.load(base_buffer, check_buffer)
    return this
  }
}

export default DynamicDictionaries
