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

export const Signup = () => {
	const formInputs = [
		{
			name: "firstName",
			placeholder: "First name",
			type: "text",
			position: "",
			errorMessage: "Please provide a valid name",
			pattern: /^[A-Za-z]{2,16}$/,
			required: "Please provide a name",
		},
		{
			name: "lastName",
			placeholder: "Last name",
			type: "text",
			position: "",
			errorMessage: "Please provide a valid name",
			pattern: /^[A-Za-z]{2,16}$/,
			required: "Please provide a name",
		},
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
			errorMessage:
				"The password must contain 8 or more characters with a mix of letters, numbers & symbols",
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
			required: "Please provide a strong password",
		},
	];

	const formSchema = Yup.object().shape({
		firstName: Yup.string()
			.matches(formInputs[0].pattern, formInputs[0].errorMessage)
			.required(formInputs[0].required),
		lastName: Yup.string()
			.matches(formInputs[1].pattern, formInputs[1].errorMessage)
			.required(formInputs[1].required),
		email: Yup.string()
			.matches(formInputs[2].pattern, formInputs[2].errorMessage)
			.required(formInputs[2].required),
		password: Yup.string()
			.matches(formInputs[3].pattern, formInputs[3].errorMessage)
			.required(formInputs[3].required),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });
	const { signup } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function onSubmit(data) {
		console.log(data);

		try {
			setLoading(true);
			await signup(data.email, data.password);
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
					<FormHeader>Sign up for a free account</FormHeader>

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

						<PrimaryButton disabled={loading}>Register</PrimaryButton>
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
			</FormContainer>
			<AuthFooter />
		</div>
	);
};
