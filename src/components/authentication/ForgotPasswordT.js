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

let renderCount = 0;
export const ForgotPassword = () => {
	renderCount++;
	console.log(renderCount);
	const {
		handleSubmit,
		register,
		trigger,
		watch,
		formState: { errors },
	} = useForm({ defaultValues: { newPassword: "" } });
	const { resetPassword } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const formInputs = [
		{
			name: "newPassword",
			placeholder: "New Password",
			type: "password",
			position: "col-span-2",
			errorMessage:
				"The password must contain 8 or more characters with a mix of letters, numbers & symbols",
			pattern:
				/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			required: "Please provide a valid password",
		},
		{
			name: "confirmPassword",
			placeholder: "Password",
			type: "password",
			position: "col-span-2",
			errorMessage: "Passwords do not match",
			pattern: "asd",
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
					<FormHeader>Create new password</FormHeader>

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

						<PrimaryButton disabled={loading}>Create</PrimaryButton>
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
