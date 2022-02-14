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
}) => {
	return (
		<div className={`${position} relative`}>
			<input
				className={`${
					error ? "border border-red-400" : ""
				} peer focus:shadow-outline focus:outline-none" w-full appearance-none rounded bg-neutral py-1 px-3 text-sm font-[200] leading-tight text-gray-500
				placeholder-[#c4c4c4] outline-none valid:border valid:border-green-400`}
				{...register(name)}
				required="true"
				type={type}
				placeholder={placeholder}
				pattern={pattern.toString().replace(/^\/|\/$/g, "")}
			/>
			<Validation error={error} helperText={helperText} />
		</div>
	);
};
