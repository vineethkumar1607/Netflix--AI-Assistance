

export const validationSchema = (name, email, password, isSignInForm) => {

    const trimmedName = name?.trim();
    const trimmedeMail = email?.trim();

    if (!isSignInForm && !trimmedName) return "Name is required";
    if (!trimmedeMail) return "Email is required";
    if (!password) return "Password is required";

    if (!isSignInForm) {
        const isNameValid = /^[A-Za-z0-9 ]{6,30}$/.test(name.trim(trimmedName))
        if (!isNameValid) return "Name must be 6-30 letters and only contain letters, numbers and spaces"
    }
    const isEmailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedeMail);
    if (!isEmailvalid) return "Email not valid";



    const isPasswordValid = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
    if (!isPasswordValid) return "Password must be at least 8 characters with 1 number, 1 uppercase letter, and 1 special character";

    return null;
}