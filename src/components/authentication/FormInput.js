import { AiFillExclamationCircle as ErrorIco } from "react-icons/ai";
import { useState } from "react";

export const FormInput = (props) => {
	const [focused, setFocused] = useState(false);
	const { id, onChange, error, ...inputProps } = props;

	function handleFocus(e) {
		setFocused(true);
	}

	return (
		<div className={`${props.position} relative`}>
			<input
				className="peer text-sm font-[200] bg-neutral text-gray-500 placeholder-[#c4c4c4] leading-tight appearance-none rounded w-full py-1 px-3 focus:outline-none focus:shadow-outline
					valid:border valid:border-green-400"
				{...inputProps}
				onChange={onChange}
				onBlur={handleFocus}
				focused={focused.toString()}
			/>
			<div className="hidden" id="error">
				<div className="text-red-400 text-[0.6rem] italic font-light">
					{error}
				</div>
				<ErrorIco className="absolute right-1 top-2 text-red-400" />
			</div>
		</div>
	);
};
