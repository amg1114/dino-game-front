import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

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
 * @param {Object} asset El archivo a subir
 * @param {*} onProgress Función de devolución de llamada que se llama cuando cambia el progreso de la carga.
 * @returns Promesa que se resuelve cuando la carga se completa con éxito o se rechaza si ocurre un error.
 */
const uploadFile = async (asset, onProgress) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `uploads/${asset.type}/${asset.name}`);
        const uploadTask = uploadBytesResumable(storageRef, asset.file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(progress);
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(storageRef).then(async (url) => {
                    return await registerFile(url, asset).then(() => {
                        resolve();
                    });
                });
            }
        );
    });
};

/**
 * Carga un archivo a Firebase de forma asíncrona
 * @param {Object} asset El archivo a subir
 * @returns Promesa que se resuelve cuando la carga se completa con éxito o se rechaza si ocurre un error.
 */
const deleteFile = async (asset) => {
    const storageRef = ref(storage, `uploads/${asset.type}/${asset.name}`);

    return await deleteObject(storageRef).then(() => {
        return axios.delete(`${process.env.REACT_APP_API}/assets/${asset.id}`);
    });
};

/**
 * Registra un archivo en la base de datos
 * @param {string} file_url URL del archivo
 * @param {*} asset Campos del asset
 * @returns Promesa que se resuelve cuando la carga se completa con éxito o se rechaza si ocurre un error.
 */
const registerFile = async (file_url, asset) => {
    const data = {
        title: asset.name,
        url: file_url,
        index: asset.index,
    };

    return axios.post(`${process.env.REACT_APP_API}/assets/${asset.type}/${asset.ownerId}`, data);
};

export { deleteFile, uploadFile };
