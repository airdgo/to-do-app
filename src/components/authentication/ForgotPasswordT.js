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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const ForgotPassword = () => {
	const formInputs = [
		{
			name: "newPassword",
			placeholder: "New Password",
			type: "password",
			position: "col-span-2",
			errorMessage:
				"The password must contain 8 or more characters with a mix of letters, numbers & symbols",
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
			required: "Please provide a valid password",
		},
		{
			name: "confirmPassword",
			placeholder: "Password",
			type: "password",
			position: "col-span-2",
			errorMessage: "Passwords do not match",
			pattern: "",
			required: "Please enter a valid password",
		},
	];

	const formSchema = Yup.object().shape({
		newPassword: Yup.string()
			.matches(formInputs[0].pattern, formInputs[0].errorMessage)
			.required(formInputs[0].required),
		confirmPassword: Yup.string()
			.required(formInputs[1].required)
			.oneOf([Yup.ref("newPassword")], "Passwords must and should match"),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });

	const { resetPassword } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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
					<FormHeader>Create new password</FormHeader>

					<div className="grid w-full grid-cols-2 gap-3">
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

						<PrimaryButton disabled={loading}>Create</PrimaryButton>
					</div>
				</Form>
			</FormContainer>
			<AuthFooter />
		</div>
	);
};
