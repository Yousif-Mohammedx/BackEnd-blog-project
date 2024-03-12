import fs from "fs";
import path from "path";

const fileRemover = (filename) => {
    fs.unlink(path.join(__dirname, 'uploads'), function (err) {
        if (err && err.code == "ENOENT") {
            // file dosent't exist
            console.log(`File ${filename} doesn't exist, won't remove it.`)
        } else if (err) {
            console.log(`Error occured while trying to remove file ${filename}`);

        } else {
            console.log(`removed ${filename}`);
        }
    });
}