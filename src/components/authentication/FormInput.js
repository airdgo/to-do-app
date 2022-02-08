import { AiFillExclamationCircle as ErrorIco } from "react-icons/ai";

export const FormInput = (props) => {
	const { onChange, error, ...inputProps } = props;

	return (
		<div className={`${props.position} relative`}>
			<input
				className="peer focus:shadow-outline w-full appearance-none rounded bg-neutral py-1 px-3 text-sm font-[200] leading-tight text-gray-500 placeholder-[#c4c4c4] valid:border
					valid:border-green-400 focus:outline-none"
				placeholder=""
				{...inputProps}
				onChange={onChange}
			/>
			<div className="hidden peer-invalid:block" id="error">
				<div className="text-[0.6rem] font-light italic text-red-400">
					{error}
				</div>
				<ErrorIco className="absolute right-1 top-2 text-red-400" />
			</div>
		</div>
	);
};
