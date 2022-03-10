import { IoMdEye } from "react-icons/io";

export const ShowPasswordButton = ({ togglePassword, showPassword }) => {
	return showPassword ? (
		<IoMdEye
			className="absolute right-6 top-[6px] cursor-pointer text-lg text-gray-400"
			onClick={togglePassword}
		/>
	) : (
		<></>
	);
};
