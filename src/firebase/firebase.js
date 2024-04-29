import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw7cDEoHsfVEB5HXr11ZVybnFpJo6xjNI",
  authDomain: "netflixgpt-81d76.firebaseapp.com",
  projectId: "netflixgpt-81d76",
  storageBucket: "netflixgpt-81d76.appspot.com",
  messagingSenderId: "612210352598",
  appId: "1:612210352598:web:878eae9d1bd675594b0477",
  measurementId: "G-F9C12PPZLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export const auth = getAuth();

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  
  if (permission === "granted") {
    console.log("User permission:", permission);
    
    try {
      const token = await getToken(messaging, {
        vapidKey: "BAetjpoZErwax4Z9mZ_PnlOE4y24XUaCISp-IvoYkGsA1hn1UQ8FUgcckHgxPeB7FJLZygTasaSb61K-RMzHn9c"
      });
      
      if (!token) {
        throw new Error("Failed to generate token");
      }
      
      console.log("Token:", token);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error, such as displaying a message to the user
    }
  } else {
    console.log("User permission:", permission);
    // Handle case when permission is not granted
  }
}
