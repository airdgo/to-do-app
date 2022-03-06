export const Form = ({ children, ...props }) => {
	return (
		<form
			className="grid w-11/12 max-w-sm place-items-center rounded-md bg-white px-8 py-6 shadow-md lg:mr-28 lg:py-10"
			{...props}
		>
			{children}
		</form>
	);
};
