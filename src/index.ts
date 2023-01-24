import TokenizerBuilder from "./TokenizerBuilder"

const kuromoji = {
  builder: function (option: { dicPath?: string }) {
    return new TokenizerBuilder(option)
  },
  dictionaryBuilder: function () {
    // return new DictionaryBuilder()
  }
}
export default kuromoji
