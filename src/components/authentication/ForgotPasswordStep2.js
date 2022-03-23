import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormInput } from "./form-components/FormInput";
import { useForm } from "react-hook-form";
import { Form } from "./form-components/Form";
import { PrimaryButton } from "./form-components/PrimaryButton";
import { FormHeader } from "./form-components/FormHeader";
import { AuthFooter } from "./AuthFooter";
import { FormContainer } from "./form-components/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export const ForgotPasswordStep2 = () => {
	const formSchema = Yup.object().shape({
		newPassword: Yup.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
				"The password must contain 8 or more characters with a mix of letters, numbers & symbols"
			)
			.required("Please provide a valid password"),
		confirmPassword: Yup.string()
			.required("Please enter a valid password")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
				"The password must contain 8 or more characters with a mix of letters, numbers & symbols"
			)
			.oneOf([Yup.ref("newPassword")], "Passwords do not match"),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
	} = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });

	const { resetPassword } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const watchInput = watch("newPassword", "");

	const [passwordShown, setPasswordShown] = useState([
		{ id: 0, showPassword: false },
		{ id: 1, showPassword: false },
	]);

	const formInputs = [
		{
			name: "newPassword",
			placeholder: "New Password",
			type: passwordShown[0].showPassword ? "text" : "password",
			position: "col-span-2",
			errorMessage:
				"The password must contain 8 or more characters with a mix of letters, numbers & symbols",
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/,
			required: "Please provide a valid password",
			passwordButton: true,
		},
		{
			name: "confirmPassword",
			placeholder: "Password",
			type: passwordShown[1].showPassword ? "text" : "password",
			position: "col-span-2",
			errorMessage: "Passwords do not match",
			pattern: watchInput,
			required: "Please enter a valid password",
			passwordButton: true,
		},
	];

	const togglePassword = (id) => {
		const newPasswordShown = passwordShown.map((password) => {
			return password.id === id
				? { ...password, showPassword: !password.showPassword }
				: password;
		});

		setPasswordShown(newPasswordShown);
	};

	const query = useQuery();

	async function onSubmit(data) {
		console.log(data);

		try {
			setLoading(true);
			await resetPassword(query.get("oobCode"), data.confirmPassword);
			navigate("/login");
		} catch (error) {
			console.log(error.message);
		}

		setLoading(false);
	}

	return (
		<div className="min-h-screen bg-background font-card">
			<FormContainer>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormHeader>Create new password</FormHeader>

					<div className="grid w-full grid-cols-2 gap-3 pb-32">
						{formInputs.map((input, index) => {
							return (
								<FormInput
									key={index}
									register={register}
									{...input}
									error={!!errors[input.name]}
									helperText={errors[input.name]?.message}
									showPassword={input.passwordButton}
									togglePassword={() => togglePassword(index)}
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
