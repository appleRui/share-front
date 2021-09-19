import firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp(
      {
          apiKey: "AIzaSyCbX54Tw_PSGB-fO3JHNsXDwETSHCbgD2g",
          authDomain: "share-app-6b9ba.firebaseapp.com",
          projectId: "share-app-6b9ba",
          storageBucket: "share-app-6b9ba.appspot.com",
          messagingSenderId: "274012171915",
          appId: "1:274012171915:web:65935bf69823ca12f42e8e",
          measurementId: "G-ZWD9XMB5SB"
      }
    )
}
  
export default firebase