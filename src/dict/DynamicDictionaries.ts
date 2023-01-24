import doublearray from 'doublearray';

class DynamicDictionaries {
  trie: doublearray.DoubleArray;
  constructor(
    trie?: null | undefined,
    token_info_dictionary?: undefined,
    connection_costs?: undefined,
    unknown_dictionary?: undefined) {
    if (trie != null) {
      this.trie = trie;
    } else {
      this.trie = doublearray.builder(0).build([
        { k: "", v: 1 }
      ]);
    }
  }
}

export default DynamicDictionaries 
