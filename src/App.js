import { Signup } from "./components/authentication/Signup";
import { Profile } from "./components/authentication/Profile";
import { Login } from "./components/authentication/Login";
import { ForgotPassword } from "./components/authentication/ForgotPasswordT";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/authentication/PrivateRoute";
import { Dashboard } from "./components/to-do-list/Dashboard";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Routes>
						{/* To do list */}
						<Route
							exact
							path="/"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>

						{/* Profile */}
						<Route
							path="/user"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>

						{/* Auth */}
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
					</Routes>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
