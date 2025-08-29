import {
    getDocs,
    getDoc,
    getFirestore,
    doc,
    collection,
    query,
    where,
    addDoc,
} from "firebase/firestore";
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
    const docRef = doc(firestore, collectionName, id);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    return data;
}

export async function register(data: {
    fullname: string;
    email: string;
    password: string;
    role?: string;
}) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email)
    );
    const snapshot = await getDocs(q);
    const user = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if (user.length > 0) {
        return {
            status: false,
            statusCode: 400,
            message: "Email already registered",
        };
    } else {
        data.role = "member";
        data.password = await bcrypt.hash(data.password, 10);

        try {
            await addDoc(collection(firestore, "users"), data);
            return { status: true, statusCode: 200, message: "Register success" };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            return {
                status: false,
                statusCode: 400,
                message: "Register failed: " + message,
            };
        }
    }
}

export async function login(data: { email: string }) {
    const q = query(
        collection(firestore, `users`),
        where(`email`, `==`, data.email),
    );
    const snapshot = await getDocs(q);
    const user = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (user) {
        return user[0];
    } else {
        return null;
    }
}
