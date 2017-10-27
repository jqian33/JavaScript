//Contain helper function to use wordnet to lookup definition of a word

var exports = module.exports = {};
const wordnet = require('wordnet');
const Definition = require('./definition.js');

exports.lookup = function(word) {
    return new Promise(resolve => {
        wordnet.lookup(word, function(err, definitions) {
            if (err) {
                resolve(null);
            }
    
            var wordDefs = [];
            definitions.forEach(function(definition) {
                wordDefs.push(new Definition(word, definition.meta.synsetType, definition.meta.words, definition.glossary));
            });
            resolve(wordDefs);
        });
    });
}



