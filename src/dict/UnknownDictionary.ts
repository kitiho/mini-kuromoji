import type { IBuffer } from 'src/types'
import ByteBuffer from 'src/util/ByteBuffer'
import CharacterDefinition from './CharacterDefinition'
import TokenInfoDictionary from './TokenInfoDictionary'

class UnknownDictionary extends TokenInfoDictionary {
  dictionary: ByteBuffer
  target_map: Record<number, number>
  pos_buffer: ByteBuffer
  character_definition: any
  constructor() {
    super()
    this.dictionary = new ByteBuffer(10 * 1024 * 1024)
    this.target_map = {} // class_id (of CharacterClass) -> token_info_id (of unknown class)
    this.pos_buffer = new ByteBuffer(10 * 1024 * 1024)
    this.character_definition = null
  }

  loadUnknownDictionaries(unk_buffer: IBuffer, unk_pos_buffer: IBuffer, unk_map_buffer: IBuffer, cat_map_buffer: IBuffer, compat_cat_map_buffer: IBuffer, invoke_def_buffer: IBuffer) {
    this.loadDictionary(unk_buffer)
    this.loadPosVector(unk_pos_buffer)
    this.loadTargetMap(unk_map_buffer)
    this.character_definition = CharacterDefinition.load(cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer)
  }
}
export default UnknownDictionary
