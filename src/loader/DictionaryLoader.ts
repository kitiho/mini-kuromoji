import DynamicDictionaries from "../dict/DynamicDictionaries";

class DictionaryLoader {
  dic: any;
  dic_path: string;
  constructor(dic_path: string) {
    this.dic = new DynamicDictionaries();
    this.dic_path = dic_path;
  }
}

export default DictionaryLoader
