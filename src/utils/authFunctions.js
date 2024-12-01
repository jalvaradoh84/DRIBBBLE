import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Function to register a new user
export const registerUser = async (email, password) => {
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the user object
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Function to log in an existing user
export const loginUser = async (email, password) => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the user object
    } catch (error) {
        console.error("Error logging in user:", error);
        console.error("Error code:", error.code); // Log the specific error code
        if (error.code === 'auth/invalid-email') {
            throw new Error("El formato del correo electrónico es inválido.");
        } else if (error.code === 'auth/user-not-found') {
            throw new Error("No hay ningún usuario registrado con este correo electrónico.");
        } else if (error.code === 'auth/wrong-password') {
            throw new Error("La contraseña es incorrecta.");
        } else {
            throw new Error("Error al iniciar sesión. Por favor, intenta de nuevo.");
        }
    }
};

// Function to log out the current user
export const logoutUser = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};
