import bcrypt from "bcryptjs";

export const saltAndHashPassword = (password: string) =>{
    const saltRounds = 10; // Adjust the cost factor according to your security requirements
    const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
     // Synchronously hash the password
    return bcrypt.hashSync(password, salt); // Return the hash directly as a string
}