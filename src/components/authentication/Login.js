import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";
import { useForm } from "react-hook-form";
import { Form } from "./Form";
import { PrimaryButton } from "./PrimaryButton";
import { FormHeader } from "./FormHeader";
import { AuthFooter } from "./AuthFooter";
import { FormContainer } from "./FormContainer";

export const Login = () => {
	const {
		handleSubmit,
		register,
		trigger,
		formState: { errors },
	} = useForm();
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const formInputs = [
		{
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
			name: "password",
			placeholder: "Password",
			type: "password",
			position: "col-span-2",
			errorMessage: "Please enter a valid password",
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
			required: "Please enter a valid password",
		},
	];

	async function onSubmit(data) {
		console.log(data);

		// try {
		// 	setLoading(true);
		// 	await login(data.email, data.password);
		// 	navigate("/");
		// } catch (error) {
		// 	console.log(error.message);
		// }

		setLoading(false);
	}

	return (
		<div className="min-h-screen bg-background font-card">
			<FormContainer>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormHeader>Autentification</FormHeader>

					<div className="grid w-full grid-cols-2 gap-3">
						{formInputs.map((input, index) => {
							return (
								<FormInput
									key={index}
									{...input}
									register={register}
									trigger={trigger}
									errors={errors}
								/>
							);
						})}

						<PrimaryButton disabled={loading}>Login</PrimaryButton>
					</div>

					<p className="mb-28 text-xs font-light">
						<Link
							to="/forgot-password"
							className="cursor-pointer font-medium text-primary"
						>
							Forgot password?
						</Link>
					</p>
				</Form>
			</FormContainer>
			<AuthFooter />
		</div>
	);
};
