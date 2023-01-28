import TokenizerBuilder from './TokenizerBuilder'
import DictionaryBuilder from './dict/builder/DictionaryBuilder'

const kuromoji = {
  builder(option: { dicPath: string }) {
    return new TokenizerBuilder(option)
  },
  dictionaryBuilder() {
    return new DictionaryBuilder()
  },
}
export default kuromoji
