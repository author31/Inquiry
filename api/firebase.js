import * as admin from 'firebase-admin';
var serviceAccount = require("../private/inquiry-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inquiry-app-default-rtdb.firebaseio.com"
});


export default admin
