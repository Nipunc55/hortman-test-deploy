// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDxCjcP-DWE1h3kAFA1vRUi3JTQRIa15II",
  authDomain: "hortman-65ae0.firebaseapp.com",
  projectId: "hortman-65ae0",
  storageBucket: "hortman-65ae0.appspot.com",
  messagingSenderId: "359808784452",
  appId: "1:359808784452:web:d4719705029c070b130411",
  measurementId: "G-ZMCQHQLL2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission !== "granted") return;

  const token = await getToken(messaging, {
    vapidKey:
      "BGyb5rtuWl9TbEvWAh3GKa4MRpjNMLo0yANcrwZfBh4Bc65Mm8xFaeatOcHArcXzajebhmlL5Sy1Dvys98GWWqg"
  });
  return token;
};

export const imageDb = getStorage(app);
