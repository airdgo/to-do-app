import { createContext, useContext, useState, useEffect } from "react";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";
import { database } from "../firebase";

const TodosContext = createContext();

export function useTodos() {
	return useContext(TodosContext);
}

export const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState("");
	const { currentUser } = useAuth();
	const userDoc = doc(database, "users", currentUser.uid);

	// Write Data
	async function handleSubmit(e, input) {
		e.preventDefault();

		if (!input) {
			return alert("Please add a to do");
		}

		const id = Math.floor(Math.random() * 1000) + 1;
		const todo = input;
		const newTodo = { id, todo, isCompleted: false };
		const ls = [...todos, newTodo];

		setTodos(ls);

		const docData = { todos: ls };

		try {
			await setDoc(userDoc, docData);
		} catch (e) {
			console.error("Error adding document: ", e);
		}

		input = "";
	}

	// Read Data
	useEffect(() => {
		async function getTodos() {
			const docRef = doc(database, "users", currentUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setTodos(docSnap.data().todos);
			} else {
				console.log("No such document!");
			}
		}
		getTodos();
	}, [currentUser.uid]);

	async function handleCompletition(id) {
		const newTodos = todos.map((todo) => {
			return todo.id === id
				? { ...todo, isCompleted: !todo.isCompleted }
				: todo;
		});

		setTodos(newTodos);

		const docData = { todos: newTodos };

		try {
			await setDoc(userDoc, docData);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	async function handleDelete(id) {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
		const docData = { todos: newTodos };

		try {
			await setDoc(userDoc, docData);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	async function clearList(e) {
		e.preventDefault();
		setTodos("");
		try {
			await setDoc(userDoc, {});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	const value = {
		todos,
		handleSubmit,
		handleCompletition,
		handleDelete,
		clearList,
	};

	return (
		<TodosContext.Provider value={value}>{children}</TodosContext.Provider>
	);
};
