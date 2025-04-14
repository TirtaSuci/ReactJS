import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
    setDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore/lite";
import app from "./init";
import bcrypt from "bcryptjs";
import { stat } from "fs";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    return snapshot.data();
}

export async function signIn(userdata: { email: string }) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", userdata.email),
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (data) {
        return data[0];
    } else {
        return null;
    }
}

export async function signInWithGoogle(userdata: any, callback: any) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", userdata.email),
    );
    const snapshot = await getDocs(q);
    const data: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (data.length > 0) {
        userdata.role = data[0].role;
        await updateDoc(doc(firestore, "users", data[0].id), userdata)
            .then(() => {
                callback({
                    status: true, message: "SignIn with Google successfully.", data: userdata
                })
            })
            .catch(() => {
                callback({
                    status: false, message: "SignIn with Google failed."
                })
            })
    } else {
        userdata.role = "member";
        await addDoc(collection(firestore, "users"), userdata)
            .then(() => {
                callback({
                    status: true,
                    message: "SignIn with Google successfully.", data: userdata
                });
            })
            .catch(() => {
                callback({
                    status: false,
                    message: "SignIn with Google failed.",
                });
            });
    }
}


export async function signUp(
    userData: {
        username: string;
        email: string;
        password: string;
        role?: string;
    },
    callback: (result: { status: boolean; message: string }) => void
) {
    const emailQuery = query(
        collection(firestore, "users"),
        where("email", "==", userData.email)
    );
    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
        return callback({ status: false, message: "Email already in use." });
    }

    const usernameQuery = query(
        collection(firestore, "users"),
        where("username", "==", userData.username)
    );
    const usernameSnapshot = await getDocs(usernameQuery);
    if (!usernameSnapshot.empty) {
        return callback({ status: false, message: "Username already in use." });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const roleMember = "member";
    const newUserRef = doc(collection(firestore, "users"));
    await setDoc(newUserRef, {
        username: userData.username,
        email: userData.email,
        role: roleMember,
        password: hashedPassword,
    });

    callback({ status: true, message: "User registered successfully." });
}
