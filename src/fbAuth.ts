import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";


// make a auth object available to the rest of the app
export let auth: any;

// this function creates a new user in the database as part of the "users" collection in a real-time database
// the function takes an email and password as arguments and returns a promise
// the promise resolves to a user object
export const initAuth = (app: any) => {
    auth = getAuth(app);
    return auth;
}

export const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.reload();
        })
        .catch((error: any) => {
            console.error("Error signing in: ", error);
        });
}

export const signOut = () => {
    return auth.signOut().then(() => {
        window.location.reload();
    }).catch((error: any) => {
        console.error("Error signing out: ", error);
    });
}