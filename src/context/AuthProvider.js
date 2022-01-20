import { auth } from "../firebase";
import { useState, useEffect, createContext, useContext } from "react";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(auth, email);
	}

	const value = { currentUser, signup, login, logout, resetPassword };

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
