import ByteBuffer from 'src/util/ByteBuffer'

class TokenInfoDictionary {
  dictionary: ByteBuffer
  target_map: Object
  pos_buffer: ByteBuffer
  constructor() {
    this.dictionary = new ByteBuffer(10 * 1024 * 1024)
    this.target_map = {} // trie_isd (of surface form) -> token_info_id (of token)
    this.pos_buffer = new ByteBuffer(10 * 1024 * 1024)
  }
}
export default TokenInfoDictionary
