/*
 * Copyright 2014 Takuya Asano
 * Copyright 2010-2014 Atilika Inc. and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

import type { IBuffer } from 'src/types'
import ByteBuffer from '../util/ByteBuffer'
import TokenInfoDictionary from './TokenInfoDictionary'
import CharacterDefinition from './CharacterDefinition'

/**
 * UnknownDictionary
 * @constructor
 */
class UnknownDictionary extends TokenInfoDictionary {
  character_definition: any
  constructor() {
    super()
    this.dictionary = new ByteBuffer(10 * 1024 * 1024)
    this.target_map = {} // class_id (of CharacterClass) -> token_info_id (of unknown class)
    this.pos_buffer = new ByteBuffer(10 * 1024 * 1024)
    this.character_definition = null
  }

  characterDefinition(character_definition: CharacterDefinition) {
    this.character_definition = character_definition
    return this
  }

  lookup(ch: any) {
    return this.character_definition.lookup(ch)
  }

  lookupCompatibleCategory(ch: any) {
    return this.character_definition.lookupCompatibleCategory(ch)
  }

  loadUnknownDictionaries(unk_buffer: IBuffer, unk_pos_buffer: IBuffer, unk_map_buffer: IBuffer, cat_map_buffer: IBuffer, compat_cat_map_buffer: IBuffer, invoke_def_buffer: IBuffer) {
    this.loadDictionary(unk_buffer)
    this.loadPosVector(unk_pos_buffer)
    this.loadTargetMap(unk_map_buffer)
    this.character_definition = CharacterDefinition.load(cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer)
  }
}

export default UnknownDictionary
