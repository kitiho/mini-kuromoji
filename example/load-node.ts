import kuromoji from '../dist/index.js'

const DIC_DIR = 'dict/'

// eslint-disable-next-line n/handle-callback-err
kuromoji.builder({ dicPath: DIC_DIR }).build((error, tokenizer) => {
  const path = tokenizer.tokenize('俺の家族は幸せだそうです。')
  console.log(path)
})
