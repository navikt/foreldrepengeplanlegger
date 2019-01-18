const path = require('path');
const fs = require('fs');

const updateStorage = function(storage) {
    const fileName = getFilePath('storage.json');
    fs.writeFileSync(fileName, JSON.stringify(storage, null, 4));
};

const getStorage = function() {
    const fileName = getFilePath('storage.json');
    if (!fs.existsSync(fileName)) {
        return {};
    } else {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'));
        } catch (err) {
            return {};
        }
    }
};

const getFilePath = function(filnavn) {
    var directories = ['.', 'mock_data', filnavn];
    return directories.join(path.sep);
};

module.exports = {
    updateStorage,
    getStorage
};
