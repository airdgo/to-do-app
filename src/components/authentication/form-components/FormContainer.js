import React from "react";

export const FormContainer = ({ children }) => {
	return (
		<div className="grid min-h-[95vh] w-full place-items-center lg:justify-items-end">
			{children}
		</div>
	);
};
