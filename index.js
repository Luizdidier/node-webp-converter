const fs = require('fs');
const sharp = require('sharp');
const ProgressBar = require("./progress");
const _ = require('lodash');

const Bar = new ProgressBar();

const originalFolder = './products';
const newFolder = './newProducts';

const transformAllImages = async () => {
    fs.readdir(originalFolder, (err, files) => {
        if (err) console.log(err);

        Bar.init(files.length);
        let current = 0;

        files.forEach(async file => {
            const fileName = file.split('.')[0];
            await sharp(`${originalFolder}/${file}`).webp().toFile(`${newFolder}/${fileName}.webp`);
            current = current + 1;
            Bar.update(current);
        });
    });
};

const verifyFiles = async () => {

    let originalFiles = await fs.promises.readdir(originalFolder, (err, files) => {
       return files;
    });

    let newFiles = await fs.promises.readdir(newFolder, (err, files) => {
        return files;
    });

    originalFiles = originalFiles.map(el => el.split('.')[0]);
    newFiles = newFiles.map(el => el.split('.')[0]);


    console.log(JSON.stringify(originalFiles));
};

// transformAllImages();
verifyFiles();