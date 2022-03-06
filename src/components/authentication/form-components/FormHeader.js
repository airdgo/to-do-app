export const FormHeader = ({ children, ...props }) => {
	return (
		<div {...props}>
			<h1 className="text-center text-4xl">LOGO</h1>
			<p className="text-md my-7 font-medium text-primary lg:my-12 lg:text-xl">
				{children}
			</p>
		</div>
	);
};
