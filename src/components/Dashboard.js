import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../context/AuthProvider";

export const Dashboard = () => {
	const { currentUser, logout } = useAuth();
	const [error, setError] = useState("");
	const navigate = useNavigate("");

	async function handleLogout() {
		setError("");

		try {
			await logout();
			navigate("/login");
			console.log(currentUser);
		} catch {
			setError("Failed to log out");
		}
	}

	return (
		<div>
			{currentUser && <h1>Welcome {currentUser.mail}</h1>}
			<button
				className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				onClick={handleLogout}
			>
				Log Out
			</button>
			{error && <p>{error}</p>}
		</div>
	);
};
