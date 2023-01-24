import DictionaryLoader from "./loader/DictionaryLoader";

class TokenizerBuilder {
  dic_path: string
  constructor(option: { dicPath: string }) {
    this.dic_path = option.dicPath
  }
  build(callback) {
    var loader = new DictionaryLoader(this.dic_path);
    // loader.load(function (err, dic) {
    //   callback(err, new Tokenizer(dic));
    // });
  }
}


export default TokenizerBuilder
