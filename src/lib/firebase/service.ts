import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
    setDoc,
} from "firebase/firestore/lite";
import app from "./init";
import bcrypt from "bcryptjs";

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

export async function signUp(
    userData: {
        username: string;
        email: string;
        password: string;
    },
    callback: (result: { status: boolean; message: string }) => void
) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        return callback({ status: false, message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUserRef = doc(collection(firestore, "users"));
    await setDoc(newUserRef, {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    });

    callback({ status: true, message: "User registered successfully." });
}

