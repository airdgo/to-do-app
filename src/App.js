import { Signup } from "./components/Signup";
import { auth } from "./firebase";

function App() {
	console.log(auth);
	return (
		<div className="App">
			<Signup />
		</div>
	);
}

export default App;
