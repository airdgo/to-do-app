import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "./form-components/FormInput";
import { useForm } from "react-hook-form";
import { Form } from "./form-components/Form";
import { PrimaryButton } from "./form-components/PrimaryButton";
import { FormHeader } from "./form-components/FormHeader";
import { AuthFooter } from "./AuthFooter";
import { FormContainer } from "./form-components/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const Login = () => {
	const [passwordShown, setPasswordShown] = useState(false);
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
			passwordButton: false,
		},
		{
			name: "password",
			placeholder: "Password",
			type: passwordShown ? "text" : "password",
			position: "col-span-2",
			errorMessage: "Please enter a valid password",
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
			required: "Please enter a valid password",
			passwordButton: true,
		},
	];

	const formSchema = Yup.object().shape({
		email: Yup.string()
			.matches(formInputs[0].pattern, formInputs[0].errorMessage)
			.required(formInputs[0].required),
		password: Yup.string()
			.matches(formInputs[1].pattern, formInputs[1].errorMessage)
			.required(formInputs[1].required),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	async function onSubmit(data) {
		console.log(data);

		try {
			setLoading(true);
			await login(data.email, data.password);
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}

		setLoading(false);
	}

	return (
		<div className="min-h-screen bg-background font-card">
			<FormContainer>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormHeader>Autentification</FormHeader>

					<div className="relative grid w-full grid-cols-2 gap-3">
						{formInputs.map((input, index) => {
							return (
								<FormInput
									key={index}
									register={register}
									{...input}
									error={!!errors[input.name]}
									helperText={errors[input.name]?.message}
									showPassword={input.passwordButton}
									togglePassword={togglePassword}
								/>
							);
						})}
						<PrimaryButton disabled={loading}>Login</PrimaryButton>
					</div>

					<p className="mb-28 text-xs font-light">
						<Link
							to="/forgot-password-step-1"
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
