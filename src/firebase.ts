import firebaseClient from "firebase/app";
import "firebase/auth";

const CLIENT_CONFIG = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};

firebaseClient.initializeApp(CLIENT_CONFIG);
firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
(window as any).firebase = firebaseClient;

export { firebaseClient };
