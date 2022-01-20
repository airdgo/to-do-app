import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { ForgotPassword } from "./components/ForgotPassword";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							exact
							path="/"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
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
