import ByteBuffer from 'src/util/ByteBuffer'

class UnknownDictionary {
  dictionary: ByteBuffer
  target_map: Object
  pos_buffer: ByteBuffer
  character_definition: any
  constructor() {
    this.dictionary = new ByteBuffer(10 * 1024 * 1024)
    this.target_map = {} // class_id (of CharacterClass) -> token_info_id (of unknown class)
    this.pos_buffer = new ByteBuffer(10 * 1024 * 1024)
    this.character_definition = null
  }
}
export default UnknownDictionary
