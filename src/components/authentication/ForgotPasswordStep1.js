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

export const ForgotPasswordStep1 = () => {
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
	];

	const formSchema = Yup.object().shape({
		email: Yup.string()
			.matches(formInputs[0].pattern, formInputs[0].errorMessage)
			.required(formInputs[0].required),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function onSubmit(data) {
		console.log(data);

		navigate("/forgot-password-step-2");

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
					<FormHeader>Forgot Password</FormHeader>

					<div className="relative grid w-full grid-cols-2 gap-3">
						{formInputs.map((input, index) => {
							return (
								<FormInput
									key={index}
									register={register}
									{...input}
									error={!!errors[input.name]}
									helperText={errors[input.name]?.message}
								/>
							);
						})}

						<PrimaryButton disabled={loading}>Reset password</PrimaryButton>
					</div>
				</Form>
			</FormContainer>
			<AuthFooter />
		</div>
	);
};
