
export const firebaseErrorMessages = (errorCode) => {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Invalid email format.";
        case "auth/user-disabled":
            return "This user account has been disabled.";
        case "auth/user-not-found":
            return "No account found with this email.";
        case "auth/wrong-password":
            return "Incorrect password. Please try again.";
        case "auth/email-already-in-use":
            return "Email is already in use. Try logging in.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/invalid-credential":
            return "Invalid credentials. Please try again.";
        default:
            return "An unknown error occurred. Please try again.";
    }
};
