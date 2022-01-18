import { auth } from "../firebase";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export function getAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
