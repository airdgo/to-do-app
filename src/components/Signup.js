import { useRef } from "react";

export const Signup = () => {
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const passwordConfirmRef = useRef("");

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<div className="w-full h-screen grid place-items-center">
			<form
				className="max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-center font-bold text-xl mb-3">Sign Up</h1>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Email"
						ref={emailRef}
					/>
				</div>
				<div>
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="**********"
					/>
					{/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Confirm Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="**********"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign In
					</button>
				</div>
			</form>
		</div>
	);
};
