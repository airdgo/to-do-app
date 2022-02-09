import {
	AiFillExclamationCircle as InvalidIco,
	AiFillCheckCircle as ValidIco,
} from "react-icons/ai";

export const FormInput = (props) => {
	const {
		pattern,
		position,
		register,
		trigger,
		errors,
		errorMessage,
		...inputProps
	} = props;

	return (
		<div className={`${props.position} relative`}>
			<input
				className={`${
					errors[props.name] && "border border-red-400"
				} peer focus:shadow-outline focus:outline-none" w-full appearance-none rounded bg-neutral py-1 px-3 text-sm font-[200] leading-tight text-gray-500
				placeholder-[#c4c4c4] outline-none valid:border valid:border-green-400`}
				{...inputProps}
				pattern={pattern.toString().replace(/^\/|\/$/g, "")}
				{...register(props.name, {
					required: props.required,
					pattern: {
						value: pattern,
						message: errorMessage,
					},
				})}
				onKeyUp={() => trigger(props.name)}
			/>
			<div className="hidden peer-valid:block">
				<ValidIco className="absolute right-1 top-2 text-green-400" />
			</div>
			{errors[props.name] && (
				<div className="">
					<div className="text-[0.6rem] font-light italic text-red-400">
						{errors[props.name].message}
					</div>
					<InvalidIco className="absolute right-1 top-2 text-red-400" />
				</div>
			)}
		</div>
	);
};
