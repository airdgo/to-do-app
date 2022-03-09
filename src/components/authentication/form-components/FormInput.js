import { ShowPasswordButton } from "./showPasswordButton";
import { Validation } from "./Validation";

export const FormInput = ({
	register,
	position,
	name,
	placeholder,
	type,
	error,
	helperText,
	pattern,
	required,
	showPassword,
	togglePassword,
}) => {
	return (
		<div className={`${position} relative`}>
			<input
				className={`${
					error ? "border border-red-400" : "valid:border-green-400"
				} peer focus:shadow-outline focus:outline-none" w-full appearance-none rounded bg-neutral py-1 px-3 text-sm font-[200] leading-tight text-gray-500
				placeholder-[#c4c4c4] outline-none valid:border `}
				{...register(name)}
				required={required}
				type={type}
				placeholder={placeholder}
				pattern={pattern && pattern.toString().replace(/^\/|\/$/g, "")}
			/>

			<ShowPasswordButton
				togglePassword={togglePassword}
				showPassword={showPassword}
			/>

			<Validation error={error} helperText={helperText} />
		</div>
	);
};
