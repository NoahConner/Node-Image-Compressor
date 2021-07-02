const sharp = require('sharp');
const fs = require('fs');

// input stream
let inStream = fs.createReadStream('./step4.svg');

// output stream
let outStream = fs.createWriteStream('step4.png', {flags: "w"});

// on error of output file being saved
outStream.on('error', function() {
    console.log("Error");
});

// on success of output file being saved
outStream.on('close', function() {
    console.log("Successfully saved file");
});

// input stream transformer
// "info" event will be emitted on resize
let transform = sharp()
                    .png({ quality: 40 })
                    .on('info', function(fileInfo) {
                        console.log("Resizing done, file not saved");
                    });

inStream.pipe(transform).pipe(outStream);