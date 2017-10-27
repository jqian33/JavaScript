const { ipcRenderer: ipc, remote } = require('electron');
const Store = require('./store.js');
const StoreCollection = require('./storeCollection.js');
const dict = require('./dictionary.js');
const templates = require('./templates.js');

var storeCollection = new StoreCollection();
var currentDef = null;
$('#buttonAdd').hide();
$('#buttonDelete').hide();

$('#btn').click(() => {
    console.log(storeCollection.get());
});

$('#buttonShuffle').click(() => {
    var randomWords = storeCollection.getRandomWords();
    $('#definitionCard').collapse('hide');
    $('#shuffledCard').collapse('show');
    $('#shuffledList').empty();
    if (randomWords.length == 0){
        $('#emptyCollectionMsg').show();
    }
    else {
        $('#emptyCollectionMsg').hide();
        randomWords.forEach(word => {
            $('#shuffledList').append(templates.BuildHtmlWords(word));
        });
    }
    console.log(randomWords);
});

$('#searchBox').keypress(async (event) => {
    var key = event.which;
    // If enter key is pressed
    if(key == 13) {
        currentDef = null;
        await LookupWord(searchBox.value);
    }
});

$('#buttonDelete').click(async () => {
    if (currentDef != null) {
        await storeCollection.delete(currentDef);
    }
    $('#buttonDelete').hide();
    $('#buttonAdd').show();
});

$('#buttonAdd').click(async () => {
    if (currentDef != null) {
        await storeCollection.add(currentDef);
    }
    $('#buttonDelete').show();
    $('#buttonAdd').hide();
});

$('body').on('click', 'a.clickableWord', async (event) => {
    console.log(event.target.text);
    await LookupWord(event.target.text);
});

async function LookupWord(word) {
    currentDef = await dict.lookup(word);
    $('#buttonDelete').hide();
    $('#buttonAdd').hide();    
    $('#shuffledCard').collapse('hide');
    $('#definitionCard').collapse('show');
    $('#definitionList').empty();
    if (currentDef == null) {
        $('#wordText').hide();
        $('#wordNotFoundMsg').show();
    }
    else {
        $('#wordText').show();
        $('#wordText').text(word);
        ToggleSaveButton(word);
        $('#wordNotFoundMsg').hide();
        currentDef.forEach(def => {
            $('#definitionList').append(templates.BuildeHtmlDefiniton(def));
        });
    }
    console.log(currentDef);   
}

function ToggleSaveButton(word) {
    if (storeCollection.inStore(word) == true) {
        $('#buttonDelete').show();
        $('#buttonAdd').hide();
    }
    else {
        $('#buttonDelete').hide();
        $('#buttonAdd').show();
    }
}
