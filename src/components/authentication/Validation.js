import {
	AiFillExclamationCircle as InvalidIco,
	AiFillCheckCircle as ValidIco,
} from "react-icons/ai";

export const Validation = ({ props }) => {
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
