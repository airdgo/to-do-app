import {
	AiFillExclamationCircle as InvalidIco,
	AiFillCheckCircle as ValidIco,
} from "react-icons/ai";

export const FormInput = (props) => {
	const { register, trigger, errors, pattern, errorMessage, ...inputProps } =
		props;

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
				onKeyUp={async () => await trigger(props.name)}
			/>

			<Validation props={errors[props.name]} />
		</div>
	);
};

const Validation = ({ props }) => {
	return (
		<>
			<div className="hidden peer-valid:block">
				<ValidIco className="absolute right-1 top-2 text-green-400" />
			</div>

			{props && (
				<div className="mt-1">
					<div className="text-[0.6rem] font-light italic text-red-400">
						{props.message}
					</div>
					<InvalidIco className="absolute right-1 top-2 text-red-400" />
				</div>
			)}
		</>
	);
};
