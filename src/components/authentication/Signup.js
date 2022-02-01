import { useEffect, useRef } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";

export const Signup = () => {
	const [formValues, setFormValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const passwordConfirmRef = useRef("");
	const { signup } = useAuth();
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const formInputs = [
		{
			id: 1,
			name: "firstName",
			placeholder: "First name",
			type: "text",
			position: "self-end",
			error: "Please provide a valid name",
			pattern: "[A-Za-z]{3,16}",
			required: true,
		},
		{
			id: 2,
			name: "lastName",
			placeholder: "Last name",
			type: "text",
			position: "self-end",
			error: "Please provide a valid name",
			pattern: "[A-Za-z]{3,16}",
			required: true,
		},
		{
			id: 3,
			name: "email",
			placeholder: "Email adress",
			type: "email",
			position: "col-span-2",
			error: "Please provide a valid Email address",
			required: true,
		},
		{
			id: 4,
			name: "password",
			placeholder: "Password",
			type: "password",
			position: "col-span-2",
			error: "Please provide a strong password",
			pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$",
			required: true,
		},
	];

	function onChange(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

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

		// if (!nameIsValid(firstNameRef.current.value)) {
		// 	return setError({ firstName: "Please provide a valid name" });
		// }

		// if (!nameIsValid(lastNameRef.current.value)) {
		// 	return setError({ lastName: "Please provide a valid name" });
		// }

		// if (!emailIsValid(emailRef.current.value)) {
		// 	return setError({ email: "Please provide a valid Email address" });
		// }

		// if (!strongPassword(passwordRef.current.value)) {
		// 	return setError({ password: "Please provide a strong password" });
		// }

		// if (passwordRef.current.value !== passwordConfirmRef.current.value) {
		// 	return setError({ password: "Passwords do not match" });
		// }

		// try {
		// 	setLoading(true);
		// 	setError("");
		// 	await signup(emailRef.current.value, passwordRef.current.value);
		// 	navigate("/");
		// } catch {
		// 	setError({ failed: "Failed to sign up" });
		// }

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
					{formInputs.map((input) => {
						return (
							<FormInput
								key={input.id}
								{...input}
								value={formValues[input.name]}
								onChange={onChange}
							/>
						);
					})}

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
