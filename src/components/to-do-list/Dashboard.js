import { Navbar } from "./Navbar";
import { Todos } from "./Todos";
import { TodosProvider } from "../../context/TodosProvider";

export const Dashboard = () => {
	return (
		<TodosProvider>
			<Navbar />
			<Todos />
		</TodosProvider>
	);
};
