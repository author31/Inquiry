const { google } = require('googleapis');
const { Router } = require('express')
const formidable = require('formidable');
const fs = require("fs");
const { resolve } = require('path');
const { userInfo } = require('os');
const router = Router()

// Obtain user credentials to use for the request
const auth = new google.auth.GoogleAuth({
    keyFile: "./api/routes/tok.json",
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.metadata'],
});
google.options({auth});
const drive = google.drive('v3');

const requireStudentID = () => {
    return(req, res, next) => {
        if(req.headers.uid == "") {
            res.status(401).json("Invalid Authentication")
        } else {
            next()
        }
    }
}

async function upload(fname, files, folderId) {
    var fileMetadata = {
        'name': fname,
        parents: [folderId]
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

async function newFolder(folderName) {
    var fileMetadata = {
        'name': folderName,
        'mimeType': 'application/vnd.google-apps.folder',
        'parents': [folderId]
    }
    const folderId = await drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    })
    return new Promise((resolve, reject) => {
        if(folderId.data){
            resolve(folderId.data)
        } else {
            reject("Created failed")
        }
    })
}

router.post("/upload", async(req, res) => {
    var folderId = ""
    new formidable.IncomingForm().parse(req)
    .on('field', (fieldName, fieldValue) => {
        folderId = fieldValue
    })
    .on("file", (name, file) => {
        upload(name, file.path, folderId)
        .then((flink) => res.status(200).json(flink))
        .catch((err) => res.status(500).json(err))
    })
    
    
})

router.get("/folderCreate/:fname", requireStudentID() ,async (req, res) => {
    newFolder(req.params.fname)
    .then((fID) => res.status(200).json(fID))
    .catch((err) => res.status(500).json(err))
})


module.exports = router