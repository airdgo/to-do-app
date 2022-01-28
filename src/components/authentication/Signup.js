import { useRef } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

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
		<div className="grid place-items-center font-card w-full h-screen">
			<form
				className="grid place-items-center w-11/12 max-w-sm bg-white shadow-3xl rounded-md px-8 pt-6 pb-8"
				onSubmit={handleSubmit}
			>
				<h1 className="text-4xl">LOGO</h1>
				<p className="text-primary font-medium text-md my-7">
					Sign up for a free account
				</p>

				<div className="grid grid-cols-2 gap-3">
					<input
						className="text-sm font-[200] bg-neutral text-gray-500 leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="First name"
						required
					/>
					<input
						className="text-sm font-[200] bg-neutral text-gray-500 leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Last name"
						required
					/>
					<input
						className="col-span-2  text-sm font-[200] bg-neutral text-gray-500 leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Email address"
						required
						ref={emailRef}
					/>
					<input
						className="col-span-2  text-sm font-[200] bg-neutral text-gray-500 leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="Create password"
						required
						ref={passwordRef}
					/>
					<input
						className="col-span-2  text-sm font-[200] bg-neutral text-gray-500 leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="Confirm password"
						required
						ref={passwordConfirmRef}
					/>

					{error && <p className="text-red-500 text-xs italic">{error}</p>}

					<button
						className="bg-primary text-white font-light col-span-2 justify-self-center w-48 py-1 px-4 my-10 rounded-md cursor-pointer focus:outline-none focus:shadow-outline"
						type="submit"
						disabled={loading}
					>
						Register
					</button>
				</div>

				<p className="font-light text-xs">
					Already a member?
					<Link
						to="/login"
						className="text-primary font-medium ml-1 cursor-pointer"
					>
						Sign In!
					</Link>
				</p>

				<p className="text-primary font-light text-xs mt-20">
					by creating an account you will receive 10 crypto
				</p>
			</form>
		</div>
	);
};
