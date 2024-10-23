const fs = require('fs');
const path = require('path');

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
    return true;
}

const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File ${filePath} deleted successfully.`);
        } else {
            console.log(`File ${filePath} not found.`);
        }
    } catch (err) {
        console.error(`Error deleting file ${filePath}:`, err);
    }
}

module.exports = {
    ensureDirectoryExistence,
    deleteFile
}