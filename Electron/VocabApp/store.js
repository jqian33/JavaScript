const electron = require('electron');
const path = require('path');
const fs = require('fs');
const util = require('./utilities.js');

class Store {
    // fileName includes .extension
    constructor(fileName, type) {
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');

        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
        this.path = path.join(userDataPath, 'store', fileName);
        console.log(this.path);
        this.data = parseDataFileSync(this.path, {Type: type, Words: []});
        util.sort(this.data.Words);
    }

    type() {
        return this.data.Type;
    }

    get() {
        return this.data.Words;
    }

    search(val) {
        return util.searchIndex(this.data.Words, val);
    }

    async add(val) {
        if (val != "" || val != 'undefined') {
            var list = this.data.Words;
            util.binaryInsert(val, list);
            await writeFile(this.path, JSON.stringify(this.data));
        }
    }

    async delete(val) {
        if (val != "" || val != 'undefined') {
            var index = util.searchIndex(this.data.Words, val);
            this.data.Words.splice(index, 1);
            await writeFile(this.path, JSON.stringify(this.data));
        }
    }

}

// async wrapper over fs.writeFile
function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, function(error){
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}

// Blocking call to read contents of a file,
// Only use in constructor
function parseDataFileSync(filePath, defaultData) {
    try {
        console.log("Parsing file");
        var data = JSON.parse(fs.readFileSync(filePath));
        console.log("Parsed JSON is: " + data);
        return data;
    }
    catch(error) {
        console.log("Failed to parse file.");
        return defaultData;
    }
}

// expose the class
module.exports = Store;