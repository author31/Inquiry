var admin = require('firebase-admin');
const { Router } = require('express')
const router = Router()

var serviceAccount = require("../../private/inquiry-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore()

//handling function

async function checkUserExist(uid) {
  const userInfo = db.collection("users").doc(uid)
  const doc = await userInfo.get()
  return new Promise((resolve, reject) => {  
    if(doc.exists) {
      resolve(doc)
    } else {
      reject("No such user")
    }
  })
}

async function addUser(payload) {
  await db.collection("users").doc(`${payload.uid}`).set(payload)
}

async function getTable(payload) {
  const snapshot = await db.collection("table_collection")
  .where('tableType', '==', payload.department).get()
  var tableList = []
  snapshot.docs.forEach((doc) => {
    const id = {id: doc.id}
    const details = Object.assign(doc.data(), id)
    tableList.push(details)
  })
  return new Promise((resolve, reject) => {
    if(Object.keys(tableList)) {
      resolve(tableList)
    } else {
      reject("No such document")
    }
  })
}

async function getDocument(docId, stdId) {
  const snapshot = await db.collection(`main_collection/${docId}/records`).where("stdId", "==", stdId).get()
  var documentList = []
  snapshot.docs.forEach((doc) => {
    const id = {id: doc.id}
    const details = Object.assign(doc.data(), id)
    documentList.push(details)
  })
  return new Promise((resolve, reject) => {
    if(Object.keys(documentList)) {
      resolve(documentList)
    } else {
      reject("No such document")
    }
  })
}

async function getRecord(tableId, docId) {
  const snapshot = await db.collection(`main_collection/${tableId}/records`).doc(docId).get()
  return new Promise((resolve, reject) => {
    if(Object.keys(snapshot.data())) {
      resolve(snapshot.data())
    } else {
      reject("No such document")
    }
  })
}

async function updateDocument(tableName, id, updateInfo) {
  await db.collection(`main_collection/${tableName}/records`).doc(id).set(updateInfo)
}

async function addDocument(tableName, record) {
  await db.collection(`main_collection/${tableName}/records`).add(record)
}

async function deleteDocument(tableName, id) {
  await db.collection(`main_collection/${tableName}/records`).doc(id).delete()
}



async function getAdminDocument(tableName) {
  const snapshot = await db.collection(`main_collection/${tableName}/records`).get()
  var documentList = []
  snapshot.docs.forEach((doc) => {
    const id = {id: doc.id}
    const details = Object.assign(doc.data(), id)
    documentList.push(details)
  })
  return new Promise((resolve, reject) => {
    if(Object.keys(documentList)) {
      resolve(documentList)
    } else {
      reject("No such document")
    }
  })
}

async function getAdminTable(payload) {
  const snapshot = await db.collection("table_collection")
  .where('editor', '==', payload.username).get()
  var tableList = []
  snapshot.docs.forEach((doc) => {
    const id = {id: doc.id}
    const details = Object.assign(doc.data(), id)
    tableList.push(details)
  })
  return new Promise((resolve, reject) => {
    if(Object.keys(tableList)) {
      resolve(tableList)
    } else {
      reject("No such document")
    }
  })
}

async function updateAdminTable(docId, updateInfo) {
  await db.collection("table_collection").doc(docId).set(updateInfo)
}

async function deteleAdminTable(tableName) {
  await db.collection(`table_collection`).doc(tableName).delete()
}

async function addAdminTable(tableName, record) {
  await db.collection(`table_collection`).add(record)
}



//registration

router.post('/login', (req, res, next) => {
  const idToken = req.body.idToken
  admin.auth().verifyIdToken(idToken).then((claims) =>  {
    checkUserExist(claims.uid)
    .then((result) => res.status(200).json({
      username: result.data().username,
      uid: result.data().uid,
      stdId: result.data().stdId,
      admin: result.data().admin,
      department: result.data().department,
      grade: result.data().grade,
      authenticated: true,
    }))
    .catch((err) => res.json({
      uid: claims.uid,
      username: '',
    }))
  })
  .catch((error) => {
    console.log(error)
  });
})

router.post("/signup", (req, res) => {
  const userInfo = req.body.userInfo
  addUser(userInfo)
  .then((result) => res.sendStatus(200))
  .catch((err) => {
    throw new Error(err)
  })
})

//admin
router.get("/admin/table", async (req, res) => {
  if(req.query.uid){
    const uid = req.query.uid.replace(" ", "")
    const userInfo = await checkUserExist(uid)
    const table = await getAdminTable(userInfo.data())
    return res.status(200).json(table);
  } else {
    return res.status(400).json("Request failed")
  }
})

router.post("/admin/update/:name", async (req, res) => {
  const docId = req.params.name
  const updateInfo = req.body.updated
  updateAdminTable(docId, updateInfo)
  .then(() => res.status(200).json({updated: "true"}))
  .catch((err) => res.status(403).json({msg: "This table doesn't exist"}))
})

router.delete("/admin/delete/:name", async (req, res) => {
  const tableName = req.params.name
  deteleAdminTable(tableName)
  .then(() => res.status(200).json({deleted: "true"}))
  .catch((err) => res.status(403).json({msg: "This document doesn't exist"}))
})

router.post("/admin/add", async (req, res) => {
  const tableName = req.body.newRecord.tableName
  const record = req.body.newRecord
  addAdminTable(tableName, record)
  .then(() => res.status(200).json({created: "true"}))
  .catch((err) => res.status(403).json({msg: "Cannot create this table"}))
})

router.get("/admin/record/:name", async (req, res) => {
  const tableName = req.params.name
  const data = await getAdminDocument(tableName)
  return res.status(200).json(data)
})

router.post("/admin/update/record/:id", async (req, res) => {
  const tableName = req.params.id.split("-")[0]
  const documentId = req.params.id.split("-")[1]
  const updateInfo = req.body.updated
  updateDocument(tableName, documentId, updateInfo)
  .then(() => res.status(200).json({updated: "true"}))
  .catch((err) => res.status(403).json({msg: "This document doesn't exist"}))
})

//user

//get table's detail
router.get("/document/:id", async (req, res) => {
  const docId = req.params.id.split("-")[0]
  const stdId = req.params.id.split("-")[1]
  const data = await getDocument(docId, stdId)
  return res.status(200).json(data)
})

router.post("/update/:id", async (req, res) => {
  const tableName = req.params.id.split("-")[0]
  const documentId = req.params.id.split("-")[1]
  const updateInfo = req.body.updated
  updateDocument(tableName, documentId, updateInfo)
  .then(() => res.status(200).json({updated: "true"}))
  .catch((err) => res.status(403).json({msg: "This document doesn't exist"}))
})

router.post("/add/:name", (req, res) => {
  const tableName = req.params.name
  const newRecord = req.body.newRecord
  addDocument(tableName, newRecord)
  .then(() => res.status(200).json({created: "true"}))
  .catch((err) => res.status(403).json({created: "failed"}))
})

router.delete("/delete/:id", (req, res) => {
  const tableName = req.params.id.split("-")[0]
  const documentId = req.params.id.split("-")[1]
  deleteDocument(tableName, documentId)
  .then(() => res.status(200).json({deleted: "true"}))
  .catch((err) => res.status(403).json({msg: "This document doesn't exist"}))
})

router.get("/document/record/:id", async (req, res) => {
  const tableId = req.params.id.split("-")[0]
  const documentId = req.params.id.split("-")[1]
  const data = await getRecord(tableId, documentId)
  return res.status(200).json(data)
})

//get list of table
router.get("/table", async (req, res) => {
  if(req.query.uid){
    const uid = req.query.uid.replace(" ", "")
    const userInfo = await checkUserExist(uid)
    const table = await getTable(userInfo.data())
    return res.status(200).json(table);
  } else {
    return res.status(400).json("Request failed")
  }
})

module.exports = router   
