import firebaseClient from "firebase/app";
import "firebase/auth";

const CLIENT_CONFIG = {
    apiKey: "AIzaSyBhPmE5vYJgvw0kF1lScuhRyNqw04olAgo",
    authDomain: "orderwell-dev.firebaseapp.com",
};

firebaseClient.initializeApp(CLIENT_CONFIG);
firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
(window as any).firebase = firebaseClient;

export { firebaseClient };
