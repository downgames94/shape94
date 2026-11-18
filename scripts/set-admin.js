import admin from "firebase-admin";
if(!process.env.FIREBASE_SERVICE_ACCOUNT||!process.env.ADMIN_UID)throw new Error("Defina FIREBASE_SERVICE_ACCOUNT e ADMIN_UID.");
admin.initializeApp({credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))});
await admin.auth().setCustomUserClaims(process.env.ADMIN_UID,{admin:true});
console.log("Custom claim admin concedida.");
await admin.app().delete();
