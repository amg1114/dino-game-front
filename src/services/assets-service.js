import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

/**
 * Carga un archivo a Firebase
 * @param {Object} asset - Objeto de información con el archivo que se va a cargar.
 * @param {function} onProgress - Función de devolución de llamada que se llama cuando cambia el progreso de la carga.
 * @param {function} onComplete - Función de devolución de llamada que se llama cuando la carga se completa con éxito.
 * @param {function} onError - Función de devolución de llamada que se llama cuando ocurre un error durante la carga.
 * @returns {Promise} Una promesa que se resuelve cuando la carga se completa con éxito o se rechaza si ocurre un error.
 */
const asyncUploadFile = (asset, onProgress, onComplete, onError) => {
    return new Promise(function (resolve, reject) {
        const storageRef = ref(storage, `uploads/${asset.path}/${asset.ownerId}/${asset.file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, asset.file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                if (snapshot.metadata) {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress + "% of " + snapshot.metadata.name);
                    onProgress(progress, snapshot.metadata.name);
                }
            },
            (error) => {
                onError({ error });
            },
            () => {
                getDownloadURL(storageRef).then((url) => {
                    registerFile(url, asset);
                    onComplete(uploadTask.snapshot.metadata.name + " upload is done.");
                });
            }
        );
    });
};

const registerFile = (file_url, asset) => {
    let data = {
        title: asset.title,
        url: file_url,
    };

    if (asset.path === "video-games") {
        data.videoGameId = asset.ownerId;
    } else {
        data.noticiaId = asset.ownerId;
    }

    axios.post("http://localhost:3000/api/assets", data)
        .then((res) => console.log("The asset was registered"))
        .catch((err)=>console.error(err));
};

export { asyncUploadFile };
