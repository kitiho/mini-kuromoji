import kuromoji from "../src/index"

var DIC_DIR = "dict/";

kuromoji.builder({ dicPath: DIC_DIR }).build(function (error, tokenizer) {
    var path = tokenizer.tokenize("すもももももももものうち");
    console.log(path);
});
