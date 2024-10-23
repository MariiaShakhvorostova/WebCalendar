import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const AuthService = {
  signInWithGoogle: async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      throw new Error("Error signing in: " + error.message);
    }
  },
};

export default AuthService;
