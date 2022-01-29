import { useEffect, useRef } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { AiFillExclamationCircle as ErrorIco } from "react-icons/ai";

export const Signup = () => {
	const firstNameRef = useRef("");
	const lastNameRef = useRef("");
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const passwordConfirmRef = useRef("");
	const { signup } = useAuth();
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		function nameIsValid(name) {
			return /^[a-zA-Z]+$/.test(name);
		}

		function emailIsValid(email) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		}

		function strongPassword(password) {
			return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
				password
			);
		}

		if (!nameIsValid(firstNameRef.current.value)) {
			return setError({ firstName: "Please provide a valid name" });
		}

		if (!nameIsValid(lastNameRef.current.value)) {
			return setError({ lastName: "Please provide a valid name" });
		}

		if (!emailIsValid(emailRef.current.value)) {
			return setError({ email: "Please provide a valid Email address" });
		}

		if (!strongPassword(passwordRef.current.value)) {
			return setError({ password: "Please provide a strong password" });
		}

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError({ password: "Passwords do not match" });
		}

		try {
			setLoading(true);
			setError("");
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch {
			setError({ failed: "Failed to sign up" });
		}

		setLoading(false);
	}

	return (
		<div className="grid place-items-center font-card bg-background w-full h-screen lg:justify-items-end">
			<form
				className="grid place-items-center w-11/12 max-w-sm bg-white shadow-md rounded-md px-8 py-6 lg:mr-28 lg:py-10"
				onSubmit={handleSubmit}
			>
				<h1 className="text-4xl">LOGO</h1>
				<p className="text-primary font-medium text-md my-7 lg:text-xl lg:my-12">
					Sign up for a free account
				</p>

				<div className="grid grid-cols-2 gap-3">
					<div className="self-end relative">
						{error.firstName && (
							<>
								<div className="text-red-400 text-[0.6rem] italic font-light mb-2">
									{error.firstName}
								</div>
								<ErrorIco className="absolute right-1 bottom-2 text-red-400" />
							</>
						)}
						<input
							className={`text-sm font-[200] bg-neutral text-gray-500 placeholder-[#c4c4c4] leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline ${
								error.firstName && "border border-red-400"
							}`}
							type="text"
							placeholder="First name"
							required
							ref={firstNameRef}
						/>
					</div>
					<div className="self-end relative">
						{error.lastName && (
							<>
								<div className="text-red-400 text-[0.6rem] italic font-light mb-2">
									{error.lastName}
								</div>
								<ErrorIco className="absolute right-1 bottom-2 text-red-400" />
							</>
						)}
						<input
							className={`text-sm font-[200] bg-neutral text-gray-500 placeholder-[#c4c4c4] leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline ${
								error.lastName && "border border-red-400"
							}`}
							type="text"
							placeholder="Last name"
							required
							ref={lastNameRef}
						/>
					</div>
					<div className="col-span-2 relative">
						{error.email && (
							<>
								<div className="text-red-400 text-[0.6rem] italic font-light mb-2">
									{error.email}
								</div>
								<ErrorIco className="absolute right-1 bottom-2 text-red-400" />
							</>
						)}
						<input
							className={`text-sm font-[200] bg-neutral text-gray-500 placeholder-[#c4c4c4] leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline lg:my-2 ${
								error.email && "border border-red-400"
							}`}
							type="text"
							placeholder="Email address"
							required
							ref={emailRef}
						/>
					</div>
					<div className="col-span-2 relative">
						{error.password && (
							<>
								<div className="text-red-400 text-[0.6rem] italic font-light mb-2">
									{error.password}
								</div>
								<ErrorIco className="absolute right-1 bottom-2 text-red-400" />
							</>
						)}
						<input
							className={`text-sm font-[200] bg-neutral text-gray-500 placeholder-[#c4c4c4] leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline ${
								error.password && "border border-red-400"
							}`}
							type="password"
							placeholder="Create password"
							required
							ref={passwordRef}
						/>
					</div>
					{/* <input
						className="col-span-2  text-sm font-[200] bg-neutral text-gray-500 leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="Confirm password"
						required
						ref={passwordConfirmRef}
					/> */}
					<button
						className="bg-primary text-white font-light col-span-2 justify-self-center w-48 py-1 px-4 my-10 rounded-md cursor-pointer focus:outline-none focus:shadow-outline lg:text-sm lg:mb-4 lg:py-2"
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

				<p className="text-primary font-light text-xs mt-20 lg:mt-12">
					by creating an account you will receive 10 crypto
				</p>
			</form>
		</div>
	);
};
