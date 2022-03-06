export const PrimaryButton = ({ children, ...props }) => {
	return (
		<button
			className="focus:shadow-outline col-span-2 my-10 w-48 cursor-pointer justify-self-center rounded-md bg-primary py-1 px-4 font-light text-white focus:outline-none lg:mb-4 lg:py-2 lg:text-sm"
			type="submit"
			{...props}
		>
			{children}
		</button>
	);
};
