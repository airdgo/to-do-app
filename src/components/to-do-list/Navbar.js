import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="absolute w-full bg-stone-100 flex justify-between py-3 px-4">
			<Link to="/">
				<h3 className="text-blue-500 hover:text-blue-800">Logo</h3>
			</Link>
			<ul>
				<Link to="/user">
					<li className="text-blue-500 hover:text-blue-800">Profile</li>
				</Link>
			</ul>
		</nav>
	);
};
