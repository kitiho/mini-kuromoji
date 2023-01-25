import TokenizerBuilder from './TokenizerBuilder'

const kuromoji = {
  builder(option: { dicPath?: string }) {
    return new TokenizerBuilder(option)
  },
  dictionaryBuilder() {
    // return new DictionaryBuilder()
  },
}
export default kuromoji
