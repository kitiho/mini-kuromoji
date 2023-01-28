import doublearray from 'doublearray';

/**
 * ViterbiNode is a node of ViterbiLattice
 * @param {number} node_name Word ID
 * @param {number} node_cost Word cost to generate
 * @param {number} start_pos Start position from 1
 * @param {number} length Word length
 * @param {string} type Node type (KNOWN, UNKNOWN, BOS, EOS, ...)
 * @param {number} left_id Left context ID
 * @param {number} right_id Right context ID
 * @param {string} surface_form Surface form of this word
 * @constructor
 */
declare class ViterbiNode {
    name: any;
    cost: any;
    start_pos: any;
    length: any;
    left_id: any;
    right_id: any;
    prev: any;
    surface_form: any;
    shortest_cost: any;
    type: any;
    constructor(node_name: number, node_cost: number, start_pos: number, length: number, type: string, left_id: number, right_id: number, surface_form: string);
}

/**
 * ViterbiLattice is a lattice in Viterbi algorithm
 * @constructor
 */
declare class ViterbiLattice {
    nodes_end_at: any[];
    eos_pos: number;
    constructor();
    /**
   * Append node to ViterbiLattice
   * @param {ViterbiNode} node
   */
    append(node: ViterbiNode): void;
    /**
   * Set ends with EOS (End of Statement)
   */
    appendEos(): void;
}

/**
 * ViterbiBuilder builds word lattice (ViterbiLattice)
 * @param {DynamicDictionaries} dic dictionary
 * @constructor
 */
declare class ViterbiBuilder {
    trie: any;
    token_info_dictionary: any;
    unknown_dictionary: any;
    constructor(dic: {
        trie: any;
        token_info_dictionary: any;
        unknown_dictionary: any;
    });
    /**
     * Build word lattice
     * @param {string} sentence_str Input text
     * @returns {ViterbiLattice} Word lattice
     */
    build(sentence_str: string): ViterbiLattice;
}

/**
 * ViterbiSearcher is for searching best Viterbi path
 * @param {ConnectionCosts} connection_costs Connection costs matrix
 * @constructor
 */
declare class ViterbiSearcher {
    connection_costs: any;
    constructor(connection_costs: any);
    /**
   * Search best path by forward-backward algorithm
   * @param {ViterbiLattice} lattice Viterbi lattice to search
   * @returns {Array} Shortest path
   */
    search(lattice: any): any[];
    forward(lattice: {
        eos_pos: number;
        nodes_end_at: any[];
    }): {
        eos_pos: number;
        nodes_end_at: any[];
    };
    backward(lattice: {
        nodes_end_at: string | any[];
    }): any[];
}

/**
 * Mappings between IPADIC dictionary features and tokenized results
 * @constructor
 */
declare class IpadicFormatter {
    constructor();
    formatEntry(word_id: any, position: any, type: any, features: any[]): any;
    formatUnknownEntry(word_id: any, position: any, type: any, features: any[], surface_form: any): any;
}

/**
 * Tokenizer
 * @param {DynamicDictionaries} dic Dictionaries used by this tokenizer
 * @constructor
 */
declare class Tokenizer {
    token_info_dictionary: any;
    unknown_dictionary: any;
    viterbi_builder: ViterbiBuilder;
    viterbi_searcher: ViterbiSearcher;
    formatter: IpadicFormatter;
    constructor(dic: {
        token_info_dictionary: any;
        unknown_dictionary: any;
        connection_costs?: any;
        trie?: any;
    });
    /**
   * Split into sentence by punctuation
   * @param {string} input Input text
   * @returns {Array.<string>} Sentences end with punctuation
   */
    static splitByPunctuation(input: any): any[];
    /**
   * Tokenize text
   * @param {string} text Input text to analyze
   * @returns {Array} Tokens
   */
    tokenize(text: any): any[];
    tokenizeForSentence(sentence: any, tokens: any[] | null): any[];
    /**
   * Build word lattice
   * @param {string} text Input text to analyze
   * @returns {ViterbiLattice} Word lattice
   */
    getLattice(text: string): ViterbiLattice;
}

/**
 * TokenizerBuilder create Tokenizer instance.
 * @param {Object} option JSON object which have key-value pairs settings
 * @param {string} option.dicPath Dictionary directory path (or URL using in browser)
 * @constructor
 */
declare class TokenizerBuilder {
    dic_path: string;
    constructor(option: {
        dicPath: string;
    });
    /**
   * Build Tokenizer instance by asynchronous manner
   * @param {TokenizerBuilder~onLoad} callback Callback function
   */
    build(callback: (arg0: any, arg1: Tokenizer) => void): void;
}

type IBuffer = number | Uint8Array | Uint16Array | Uint32Array;

/**
 * Connection costs matrix from cc.dat file.
 * 2 dimension matrix [forward_id][backward_id] -> cost
 * @constructor
 * @param {number} forward_dimension
 * @param {number} backward_dimension
 */
declare class ConnectionCosts {
    forward_dimension: any;
    backward_dimension: any;
    buffer: any;
    constructor(forward_dimension: number, backward_dimension: number);
    put(forward_id: number, backward_id: number, cost: any): void;
    get(forward_id: number, backward_id: number): any;
    loadConnectionCosts(connection_costs_buffer: any[] | Int16Array): void;
}

/**
 * TokenInfoDictionary
 * @constructor
 */
declare class TokenInfoDictionary {
    dictionary: any;
    target_map: any;
    pos_buffer: any;
    constructor();
    buildDictionary(entries: string | any[]): any;
    put(left_id: any, right_id: any, word_cost: any, surface_form: any, feature: any): any;
    addMapping(source: number, target: string | number): void;
    targetMapToBuffer(): Uint8Array;
    loadDictionary(array_buffer: IBuffer | undefined): this;
    loadPosVector(array_buffer: IBuffer | undefined): this;
    loadTargetMap(array_buffer: IBuffer | undefined): this;
    /**
     * Look up features in the dictionary
     * @param {string} token_info_id_str Word ID to look up
     * @returns {string} Features string concatenated by ","
     */
    getFeatures(token_info_id_str: string): any;
}

declare class CharacterClass {
    class_id: any;
    class_name: any;
    is_always_invoke: any;
    is_grouping: any;
    max_length: any;
    constructor(class_id: number, class_name: string, is_always_invoke: number | boolean, is_grouping: number | boolean, max_length: number);
}

/**
 * CharacterDefinition represents char.def file and
 * defines behavior of unknown word processing
 * @constructor
 */
declare class CharacterDefinition {
    character_category_map: any;
    compatible_category_map: any;
    invoke_definition_map: any;
    constructor();
    /**
   * Load CharacterDefinition
   * @param {Uint8Array} cat_map_buffer
   * @param {Uint32Array} compat_cat_map_buffer
   * @param {InvokeDefinitionMap} invoke_def_buffer
   * @returns {CharacterDefinition}
   */
    static load(cat_map_buffer: IBuffer, compat_cat_map_buffer: IBuffer, invoke_def_buffer: IBuffer | undefined): CharacterDefinition;
    static parseCharCategory(class_id: number, parsed_category_def: string[]): CharacterClass | null;
    static parseCategoryMapping(parsed_category_mapping: string | any[]): {
        start: number;
        default: any;
        compatible: string | any[];
    };
    static parseRangeCategoryMapping(parsed_category_mapping: string | any[]): {
        start: number;
        end: number;
        default: any;
        compatible: string | any[];
    };
    /**
   * Initializing method
   * @param {Array} category_mapping Array of category mapping
   */
    initCategoryMappings(category_mapping: string | any[] | null): void;
    /**
   * Lookup compatible categories for a character (not included 1st category)
   * @param {string} ch UCS2 character (just 1st character is effective)
   * @returns {Array.<CharacterClass>} character classes
   */
    lookupCompatibleCategory(ch: string): any[];
    /**
   * Lookup category for a character
   * @param {string} ch UCS2 character (just 1st character is effective)
   * @returns {CharacterClass} character class
   */
    lookup(ch: string): any;
}

/**
 * UnknownDictionary
 * @constructor
 */
declare class UnknownDictionary extends TokenInfoDictionary {
    character_definition: any;
    constructor();
    characterDefinition(character_definition: CharacterDefinition): this;
    lookup(ch: any): any;
    lookupCompatibleCategory(ch: any): any;
    loadUnknownDictionaries(unk_buffer: IBuffer, unk_pos_buffer: IBuffer, unk_map_buffer: IBuffer, cat_map_buffer: IBuffer, compat_cat_map_buffer: IBuffer, invoke_def_buffer: IBuffer): void;
}

declare class DynamicDictionaries {
    trie: doublearray.DoubleArray;
    token_info_dictionary: TokenInfoDictionary;
    connection_costs: ConnectionCosts;
    unknown_dictionary: UnknownDictionary;
    constructor(trie?: any | null | undefined, token_info_dictionary?: any, connection_costs?: any, unknown_dictionary?: any);
    loadTrie(base_buffer: any, check_buffer: any): this;
    loadTokenInfoDictionaries(token_info_buffer: IBuffer, pos_buffer: IBuffer, target_map_buffer: IBuffer): this;
    loadUnknownDictionaries(unk_buffer: IBuffer, unk_pos_buffer: IBuffer, unk_map_buffer: IBuffer, cat_map_buffer: IBuffer, compat_cat_map_buffer: IBuffer, invoke_def_buffer: IBuffer): this;
    loadConnectionCosts(cc_buffer: Int16Array): this;
}

/**
 * Builder class for constructing ConnectionCosts object
 * @constructor
 */
declare class ConnectionCostsBuilder {
    lines: number;
    connection_cost: any;
    constructor();
    putLine(line: any): this;
    build(): any;
}

/**
 * CharacterDefinitionBuilder
 * @constructor
 */
declare class CharacterDefinitionBuilder {
    char_def: CharacterDefinition;
    character_category_definition: any[];
    category_mapping: any[];
    constructor();
    putLine(line: string): void;
    build(): CharacterDefinition;
}

/**
 * Build dictionaries (token info, connection costs)
 *
 * Generates from matrix.def
 * cc.dat: Connection costs
 *
 * Generates from *.csv
 * dat.dat: Double array
 * tid.dat: Token info dictionary
 * tid_map.dat: targetMap
 * tid_pos.dat: posList (part of speech)
 */
declare class DictionaryBuilder {
    tid_entries: any[];
    unk_entries: any[];
    cc_builder: ConnectionCostsBuilder;
    cd_builder: CharacterDefinitionBuilder;
    constructor();
    addTokenInfoDictionary(line: string): this;
    /**
   * Put one line of "matrix.def" file for building ConnectionCosts object
   * @param {string} line is a line of "matrix.def"
   */
    putCostMatrixLine(line: any): this;
    putCharDefLine(line: string): this;
    /**
   * Put one line of "unk.def" file for building UnknownDictionary object
   * @param {string} line is a line of "unk.def"
   */
    putUnkDefLine(line: string): this;
    build(): DynamicDictionaries;
    /**
   * Build TokenInfoDictionary
   *
   * @returns {{trie: *, token_info_dictionary: *}}
   */
    buildTokenInfoDictionary(): {
        trie: doublearray.DoubleArray;
        token_info_dictionary: TokenInfoDictionary;
    };
    buildUnknownDictionary(): UnknownDictionary;
    /**
   * Build double array trie
   *
   * @returns {DoubleArray} Double-Array trie
   */
    buildDoubleArray(): doublearray.DoubleArray;
}

declare const kuromoji: {
    builder(option: {
        dicPath: string;
    }): TokenizerBuilder;
    dictionaryBuilder(): DictionaryBuilder;
};

export { kuromoji as default };
