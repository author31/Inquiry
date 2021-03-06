const { google } = require('googleapis');
const { Router } = require('express')
const formidable = require('formidable');
const fs = require("fs");
const { resolve } = require('path');
const router = Router()

// Obtain user credentials to use for the request
const auth = new google.auth.GoogleAuth({
    keyFile: "./api/routes/tok.json",
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.metadata'],
});
google.options({auth});
const drive = google.drive('v3');


async function upload(fname, files) {
    var fileMetadata = {
        'name': fname,
        parents: ["18a2QJlHc9fEbMJQIqJb-CB4l0XxoQctz"]
      };
    var media = {
        body: fs.createReadStream(files)
    }
    const results = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });
    return new Promise((resolve, reject) => {
        if(results.data){
            var flink = `https://drive.google.com/file/d/${results.data.id}/view`
            resolve(flink)
        } else {
            reject("Upload failed")
        }
    })
}


router.post("/upload", async(req, res) => {
    new formidable.IncomingForm().parse(req)
    .on("file", (name, file) => {
        upload(name, file.path)
        .then((flink) => res.status(200).json(flink))
        .catch((err) => res.status(500).json(err))
    })
})

module.exports = router