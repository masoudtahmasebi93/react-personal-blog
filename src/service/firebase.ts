// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, remove, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAua-DCVgqdDV_6kHE6z32AKlnG9mcaShs",
    authDomain: "masoud-blog-react.firebaseapp.com",
    databaseURL: "https://masoud-blog-react-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "masoud-blog-react",
    storageBucket: "masoud-blog-react.appspot.com",
    messagingSenderId: "1093039176712",
    appId: "1:1093039176712:web:5cce808a8787e01864e5bd",
    measurementId: "G-DWF024HEPY"
};

// Initialize Firebase
// const app = 
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

export function getPosts() {
    const db = getDatabase();
    const starCountRef = ref(db, 'posts');
    return starCountRef;
}


export function writeUserData(userId: any, name: any, email: any, imageUrl: any) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

export function writeBlogPost(userId: any, name: any, email: any, imageUrl: any) {
    const db = getDatabase();
    set(ref(db, 'posts'), {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

export function deleteBlogPost(blogId: string) {
    const db = getDatabase();
    console.log(blogId)
    return remove(ref(db, '/posts/' + blogId));
}

export function createUser(email: string, password: string) {
    const auth = getAuth()
    return createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export function signIn(email: string, password: string) {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, email, password)
}

export function getCurrentUser() {
    // const auth = getAuth();
    // console.log('auth0', auth);
    // const user = auth.currentUser;

    // if (user) {
    //     console.log('auth', user);

    //     return user;
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     // ...
    // } else {
    //     return false
    //     // No user is signed in.
    // }
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('aaa')

            return user;
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid;
            // ...
        } else {
            return null;
            // User is signed out
            // ...
        }
    });
}

export function logoutUser() {
    const auth = getAuth();
    return signOut(auth)

}