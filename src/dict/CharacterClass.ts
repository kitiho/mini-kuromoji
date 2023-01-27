class CharacterClass {
  class_id: any
  class_name: any
  is_always_invoke: any
  is_grouping: any
  max_length: any
  constructor(class_id, class_name, is_always_invoke, is_grouping, max_length) {
    this.class_id = class_id
    this.class_name = class_name
    this.is_always_invoke = is_always_invoke
    this.is_grouping = is_grouping
    this.max_length = max_length
  }
}
export default CharacterClass
