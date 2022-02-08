import { useEffect, useRef } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";
import { useForm } from "react-hook-form";

export const Signup = () => {
	const [formValues, setFormValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm();
	const { signup } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const formInputs = [
		{
			id: 1,
			name: "firstName",
			placeholder: "First name",
			type: "text",
			position: "",
			error: "Please provide a valid name",
			pattern: /[A-Za-z]{3,16}/,
			required: true,
		},
		{
			id: 2,
			name: "lastName",
			placeholder: "Last name",
			type: "text",
			position: "",
			error: "Please provide a valid name",
			pattern: /[A-Za-z]{3,16}/,
			required: true,
		},
		{
			id: 3,
			name: "email",
			placeholder: "Email adress",
			type: "email",
			position: "col-span-2",
			error: "Please provide a valid Email address",
			pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
			required: true,
		},
		{
			id: 4,
			name: "password",
			placeholder: "Password",
			type: "password",
			position: "col-span-2",
			error: "Please provide a strong password",
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
			required: true,
		},
	];

	function onChange(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	// async function handleSubmit(e) {
	// 	e.preventDefault();

	// 	// try {
	// 	// 	setLoading(true);
	// 	// 	setError("");
	// 	// 	await signup(emailRef.current.value, passwordRef.current.value);
	// 	// 	navigate("/");
	// 	// } catch {
	// 	// 	setError({ failed: "Failed to sign up" });
	// 	// }

	// 	setLoading(false);
	// }

	const onSubmit = (data) => console.log(data);
	console.log(errors);

	return (
		<div className="grid h-screen w-full place-items-center bg-background font-card lg:justify-items-end">
			<form
				className="grid w-11/12 max-w-sm place-items-center rounded-md bg-white px-8 py-6 shadow-md lg:mr-28 lg:py-10"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-4xl">LOGO</h1>
				<p className="text-md my-7 font-medium text-primary lg:my-12 lg:text-xl">
					Sign up for a free account
				</p>

				<div className="grid grid-cols-2 gap-3">
					{/* {formInputs.map((input) => {
						return (
							<FormInput
								key={input.id}
								{...input}

								value={formValues[input.name]}
								onChange={onChange}
							/>
						);
					})} */}

					{formInputs.map((input) => {
						return (
							<div className={`${input.position} relative`}>
								<input
									className="peer focus:shadow-outline w-full appearance-none rounded bg-neutral py-1 px-3 text-sm font-[200] leading-tight text-gray-500 placeholder-[#c4c4c4] focus:outline-none"
									placeholder={input.placeholder}
									{...register(input.name, {
										required: input.required,
										pattern: { value: input.pattern, message: input.error },
									})}
									onKeyUp={() => trigger(input.name)}
								/>
								{errors[input.name] && (
									<div className="" id="error">
										<div className="text-[0.6rem] font-light italic text-red-400">
											{errors[input.name].message}
										</div>
										{/* <ErrorIco className="absolute right-1 top-2 text-red-400" /> */}
									</div>
								)}
							</div>
						);
					})}

					<button
						className="focus:shadow-outline col-span-2 my-10 w-48 cursor-pointer justify-self-center rounded-md bg-primary py-1 px-4 font-light text-white focus:outline-none lg:mb-4 lg:py-2 lg:text-sm"
						type="submit"
						disabled={loading}
					>
						Register
					</button>
				</div>

				<p className="text-xs font-light">
					Already a member?
					<Link
						to="/login"
						className="ml-1 cursor-pointer font-medium text-primary"
					>
						Sign In!
					</Link>
				</p>

				<p className="mt-20 text-xs font-light text-primary lg:mt-12">
					by creating an account you will receive 10 crypto
				</p>
			</form>
		</div>
	);
};
