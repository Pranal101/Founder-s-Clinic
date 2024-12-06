"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6isaYnWMqpmqtYQ0WMHjQSDPzvFWrp4Q",
  authDomain: "founders-clinic-3d0a9.firebaseapp.com",
  projectId: "founders-clinic-3d0a9",
  storageBucket: "founders-clinic-3d0a9.firebasestorage.app",
  messagingSenderId: "117483306758",
  appId: "1:117483306758:web:6fb7bc12463188ea872887",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
