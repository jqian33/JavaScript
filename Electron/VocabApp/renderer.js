const { ipcRenderer: ipc, remote } = require('electron');
const Store = require('./store.js');
const StoreCollection = require('./storeCollection.js');
const dict = require('./dictionary.js');
const templates = require('./templates.js');

var storeCollection = new StoreCollection();
var currentDef = null;

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
    HideDeleteButton();
    ShowAddButton();
});

$('#buttonAdd').click(async () => {
    if (currentDef != null) {
        await storeCollection.add(currentDef);
    }
    HideAddButton();
    ShowDeleteButton();
});

$('body').on('click', 'a.clickableWord', async (event) => {
    await LookupWord(event.target.text);
});

async function LookupWord(word) {
    currentDef = await dict.lookup(word);
    HideAddButton();
    HideDeleteButton();   
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
            $('#definitionList').append(templates.BuildHtmlDefinition(def));
        });
    } 
}

function ToggleSaveButton(word) {
    if (storeCollection.inStore(word) == true) {
        HideAddButton();
        ShowDeleteButton();
    }
    else {
        HideDeleteButton();
        ShowAddButton();
    }
}

function HideAddButton() {
    $('#buttonAdd').hide();
    $('#buttonAddParent').hide();
}

function ShowAddButton() {
    $('#buttonAdd').show();
    $('#buttonAddParent').show();
}

function HideDeleteButton() {
    $('#buttonDelete').hide();
    $('#buttonDeleteParent').hide();
}

function ShowDeleteButton() {
    $('#buttonDelete').show();
    $('#buttonDeleteParent').show();
}