const fs = require('fs');


const deletefile = (filepath) => {
    fs.unlink(`public${filepath}`,error => {
        console.error(error)
    });
}
module.exports = deletefile;