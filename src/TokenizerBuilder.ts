import DictionaryLoader from './loader/DictionaryLoader'

class TokenizerBuilder {
  dic_path: string
  constructor(option: { dicPath?: string }) {
    this.dic_path = option.dicPath ?? 'dict/'
  }

  build(callback) {
    const loader = new DictionaryLoader(this.dic_path)
    loader.load((err, dic) => {
      callback(err, new Tokenizer(dic))
    })
  }
}

export default TokenizerBuilder
