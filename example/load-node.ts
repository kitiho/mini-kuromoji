import kuromoji from '../dist/index.js'

const DIC_DIR = 'dict/'

kuromoji.builder({ dicPath: DIC_DIR }).build((error, tokenizer) => {
  if (error)
    console.log(error)
  const path = tokenizer.tokenize('俺の家族は幸せだそうです。')
  console.log(path)
})
