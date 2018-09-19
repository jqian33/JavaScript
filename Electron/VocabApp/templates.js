// Contain functions to return dynamic html templates
var exports = module.exports = {};

exports.BuildeHtmlDefiniton = function(definition) {
    return '<ul class="list-group">' +
    '<li class="list-group-item"><i>' + definition.type + '</i></li>' +
    '<li class="list-group-item">' + definition.definition + '</li>' +
    '</ul>';
}

exports.BuildHtmlWords = function(word) {
    return '<ul class="list-group">' +
    '<li class="list-group-item"><i>' + word.Type + '</i></li>' +
    '<li class="list-group-item"><a class="clickableWord">' + word.Word + '</a></li>' +
    '</ul>';
}