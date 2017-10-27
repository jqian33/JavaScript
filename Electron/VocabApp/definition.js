class Definition {
    constructor (word, type, words, definition) {
        this.word = word;
        this.type = type;
        this.words = words;
        this.definition = definition;
    }
}

// expose the class
module.exports = Definition;