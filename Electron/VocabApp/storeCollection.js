const electron = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('./store.js');
const Definition = require('./definition.js');

class StoreCollection {
    constructor () {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        var storeDir = path.join(userDataPath, 'store');
        this.storeList = [];
        if (fs.existsSync(storeDir)) {
            fs.readdirSync(storeDir).forEach(file => {
                if(path.extname(file) === ".json") {
                    this.storeList.push(new Store(file));
                }
            });
        }
        else {
            fs.mkdirSync(storeDir)
        }
    }

    async add(definition) {
        definition.forEach(async (word) => {
            var targetStore = null;
            this.storeList.forEach(store => {
                if (store.type() == word.type) {
                    targetStore = store;
                }
            })
            if (targetStore == null) {
                var fileName = word.type + '.json';
                targetStore = new Store(fileName, word.type);
                this.storeList.push(targetStore);
            }
            await targetStore.add(word.word);
        });
    }

    async delete(definition) {
        definition.forEach(async (word) => {
            for (var i = 0; i < this.storeList.length; i++) {
                var currentStore = this.storeList[i];   
                if (currentStore.type() == word.type) {
                    await currentStore.delete(word.word);
                }
            }
        });
    }

    inStore(word){
        var exists = false;
        for (var i = 0; i < this.storeList.length; i++) {
            if(this.storeList[i].search(word) != -1) {
                exists = true;
                break;
            }
        }
        return exists;
    }

    get(){
        var wordList = [];
        this.storeList.forEach(entry => {
            wordList.push(entry.get());
        });
        return wordList;
    }

    getRandomWords() {
        var result = [];
        this.storeList.forEach(store => {
            var wordList = store.get();
            if (wordList.length != 0) {
                // Returns a random number between 0 (inclusive) and wordList.length (exclusive)
                var rnd = Math.floor(Math.random() * wordList.length);
                var entry = { Word: wordList[rnd], Type: store.type() };
                result.push(entry);
            }
        });
        return result;
    }
}

// expose the class
module.exports = StoreCollection;