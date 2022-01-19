import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../context/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Signup = () => {
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const passwordConfirmRef = useRef("");
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		function emailIsValid(email) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		}

		if (!emailIsValid(emailRef.current.value)) {
			return setError("Invalid email");
		}

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setLoading(true);
			setError("");
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch {
			setError("Failed to sign up");
		}

		setLoading(false);
	}

	return (
		<div className="w-full h-screen grid place-items-center">
			<form
				className="max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-center font-bold text-xl mb-3">Sign Up</h1>
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
				</div>
				<div>
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="**********"
						required
						ref={passwordRef}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Confirm Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="**********"
						required
						ref={passwordConfirmRef}
					/>
					{error && <p className="text-red-500 text-xs italic">{error}</p>}
				</div>

				<div className="flex items-center justify-between">
					<button
						className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						disabled={loading}
					>
						Sign Up
					</button>
				</div>
				<div className="mt-5">
					Already have an account?{" "}
					<Link to="/login" className=" text-violet-400 underline">
						Log In!
					</Link>
				</div>
			</form>
		</div>
	);
};
