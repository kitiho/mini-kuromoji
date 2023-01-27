import type { IBuffer } from 'src/types'
import InvokeDefinitionMap from './InvokeDefinitionMap'

class CharacterDefinition {
  character_category_map: IBuffer
  compatible_category_map: IBuffer
  invoke_definition_map: any
  constructor() {
    this.character_category_map = new Uint8Array(65536) // for all UCS2 code points
    this.compatible_category_map = new Uint32Array(65536) // for all UCS2 code points
    this.invoke_definition_map = null
  }

  static load(cat_map_buffer: IBuffer, compat_cat_map_buffer: IBuffer, invoke_def_buffer: IBuffer) {
    const char_def = new CharacterDefinition()
    char_def.character_category_map = cat_map_buffer
    char_def.compatible_category_map = compat_cat_map_buffer
    char_def.invoke_definition_map = InvokeDefinitionMap.load(invoke_def_buffer)
    return char_def
  }
}

export default CharacterDefinition
