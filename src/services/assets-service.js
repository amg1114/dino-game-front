import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNRRLubiJMj03wnUD3YNs9zrbp_FUnVc0",
    authDomain: "dinogame-6bcaa.firebaseapp.com",
    projectId: "dinogame-6bcaa",
    storageBucket: "dinogame-6bcaa.appspot.com",
    messagingSenderId: "721742419152",
    appId: "1:721742419152:web:19d0514a01bd40df20fad5",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFileToFirebase = (file, onComplete, onError) => {
    // Crear una referencia al archivo en el almacenamiento de Firebase
    const storageRef = ref(storage, `uploads/${file.name}`);
    
    // Subir el archivo a Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Manejar eventos de éxito y error
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Progreso de la carga (opcional)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // Error al cargar el archivo
        onError(error);
      }, 
      () => {
        // Éxito al cargar el archivo
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          onComplete(downloadURL);
        });
      }
    );
  };
  
  export { uploadFileToFirebase };