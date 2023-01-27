import type { IBuffer } from 'src/types'
import ByteBuffer from 'src/util/ByteBuffer'
import CharacterClass from './CharacterClass'

class InvokeDefinitionMap {
  map: any[]
  lookup_table: any
  constructor() {
    this.map = []
    this.lookup_table = {} // Just for building dictionary
  }

  static load(invoke_def_buffer?: IBuffer) {
    const invoke_def = new InvokeDefinitionMap()
    const character_category_definition: any[] = []

    const buffer = new ByteBuffer(invoke_def_buffer)
    while (buffer.position + 1 < buffer.size()) {
      const class_id = character_category_definition.length
      const is_always_invoke = buffer.get()
      const is_grouping = buffer.get()
      const max_length = buffer.getInt()
      const class_name = buffer.getString()
      character_category_definition.push(new CharacterClass(class_id, class_name, is_always_invoke, is_grouping, max_length))
    }

    invoke_def.init(character_category_definition)

    return invoke_def
  }

  init(character_category_definition: string | any[] | null) {
    if (character_category_definition == null)
      return

    for (let i = 0; i < character_category_definition.length; i++) {
      const character_class = character_category_definition[i]
      this.map[i] = character_class
      this.lookup_table[character_class.class_name] = i
    }
  }

  getCharacterClass(class_id: number) {
    return this.map[class_id]
  }

  lookup(class_name: string | number) {
    const class_id = this.lookup_table[class_name]
    if (class_id == null)
      return null

    return class_id
  }

  toBuffer() {
    const buffer = new ByteBuffer()
    for (let i = 0; i < this.map.length; i++) {
      const char_class = this.map[i]
      buffer.put(char_class.is_always_invoke)
      buffer.put(char_class.is_grouping)
      buffer.putInt(char_class.max_length)
      buffer.putString(char_class.class_name)
    }
    buffer.shrink()
    return buffer.buffer
  }
}

export default InvokeDefinitionMap
