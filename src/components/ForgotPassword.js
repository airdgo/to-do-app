import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
	const emailRef = useRef("");
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		function emailIsValid(email) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		}

		if (!emailIsValid(emailRef.current.value)) {
			return setError("Invalid email");
		}

		try {
			setLoading(true);
			setError("");
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError("Failed to reset password");
		}

		setLoading(false);
	}

	return (
		<div className="w-full min-h-screen flex justify-center items-center flex-col">
			<form
				className="max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-center font-bold text-xl mb-3">Reset Password</h1>
				{message && (
					<div className=" text-sm bg-green-100 text-green-900 border-green-600 p-4 mb-4 border rounded">
						{message}
					</div>
				)}

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Email"
						required
						ref={emailRef}
					/>
					{error && <p className="text-red-500 text-xs italic">{error}</p>}
				</div>
				<div className="flex items-center justify-between">
					<button
						className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						disabled={loading}
					>
						Reset Password
					</button>
				</div>
			</form>
			<div>
				<Link to="/login" className=" text-violet-400 underline">
					Log In!
				</Link>
			</div>
		</div>
	);
};
