import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../../context/AuthProvider";

export const Profile = () => {
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
	console.log(currentUser);

	return (
		<div>
			{currentUser && <h1>{JSON.stringify(currentUser)}</h1>}
			<button
				className="focus:shadow-outline rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 focus:outline-none"
				onClick={handleLogout}
			>
				Log Out
			</button>
			{error && <p>{error}</p>}
		</div>
	);
};
