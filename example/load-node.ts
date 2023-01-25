import kuromoji from '../src/index'

const DIC_DIR = 'dict/'

kuromoji.builder({ dicPath: DIC_DIR }).build((error, tokenizer) => {
  const path = tokenizer.tokenize('すもももももももものうち')
  console.log(path)
})
