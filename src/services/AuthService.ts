import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export class AuthService {
    async login() {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log("erro ao fazer login");
        }
    }

    async logout() {
        try {
            auth.signOut();
        } catch (error) {
            console.log("erro ao fazer o logout");
        }
    }
}