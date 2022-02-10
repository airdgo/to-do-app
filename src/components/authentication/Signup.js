import { useEffect, useRef } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";
import { useForm } from "react-hook-form";
import { Form } from "./Form";

export const Signup = () => {
	const {
		handleSubmit,
		register,
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
			errorMessage: "Please provide a valid name",
			pattern: /^[A-Za-z]{2,16}$/,
			required: "Please provide a name",
		},
		{
			id: 2,
			name: "lastName",
			placeholder: "Last name",
			type: "text",
			position: "",
			errorMessage: "Please provide a valid name",
			pattern: /^[A-Za-z]{2,16}$/,
			required: "Please provide a name",
		},
		{
			id: 3,
			name: "email",
			placeholder: "Email adress",
			type: "email",
			position: "col-span-2",
			errorMessage: "Please provide a valid Email address",
			pattern:
				/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			required: "Please provide an Email address",
		},
		{
			id: 4,
			name: "password",
			placeholder: "Password",
			type: "password",
			position: "col-span-2",
			errorMessage:
				"The password must contain 8 or more characters with a mix of letters, numbers & symbols",
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
			required: "Please provide a strong password",
		},
	];

	function onSubmit(data) {
		console.log(data);

		// 	// try {
		// 	// 	setLoading(true);
		// 	// 	setError("");
		// 	// 	await signup(data.email, data.password);
		// 	// 	navigate("/");
		// 	// } catch {
		// 	// 	setError({ failed: "Failed to sign up" });
		// 	// }

		setLoading(false);
	}

	return (
		<div className="min-h-screen bg-background font-card">
			<div className="grid min-h-[95vh] w-full place-items-center lg:justify-items-end">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<h1 className="text-4xl">LOGO</h1>
					<p className="text-md my-7 font-medium text-primary lg:my-12 lg:text-xl">
						Sign up for a free account
					</p>

					<div className="grid grid-cols-2 gap-3">
						{formInputs.map((input) => {
							return (
								<FormInput
									key={input.id}
									{...input}
									register={register}
									trigger={trigger}
									errors={errors}
								/>
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
				</Form>
			</div>
			<footer className="w-full">
				<div className="font flex h-full w-full justify-around text-xs lg:text-sm">
					<div>Copywright @ TruYou 2021</div>
					<div>www.truyou.com</div>
				</div>
			</footer>
		</div>
	);
};
