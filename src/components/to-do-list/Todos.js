import { database } from "../../firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

export const Todos = () => {
	const todoRef = useRef();
	const [todos, setTodos] = useState("");
	const { currentUser } = useAuth();
	const userDoc = doc(database, "users", currentUser.uid);

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(currentUser.uid);

		const id = Math.floor(Math.random() * 1000) + 1;
		const todo = todoRef.current.value;
		const newTodo = { id, todo };
		const ls = [...todos, newTodo];

		setTodos(ls);

		const docData = { todos: ls };

		try {
			await setDoc(userDoc, docData);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	// Read Data
	// useEffect(() => {
	// 	async function getTodos() {
	// 		const docRef = doc(database, "users", currentUser.uid);
	// 		const docSnap = await getDoc(docRef);

	// 		if (docSnap.exists()) {
	// 			setTodos(docSnap.data().todos);
	// 		} else {
	// 			console.log("No such document!");
	// 		}
	// 	}

	// 	getTodos();
	// }, []);

	return (
		<div className="w-full h-full flex justify-center items-center flex-col">
			<div className="mt-4 border-2">
				<h1>TO DO LIST</h1>
				<form className="form" onSubmit={handleSubmit}>
					<input
						className=" border-2 border-slate-500"
						type="text"
						placeholder="Add a New Task"
						ref={todoRef}
					/>
					<div className="form-buttons">
						<button className="bg-green-200" type="submit">
							Add Note
						</button>
						<button className="bg-red-200">Clear List</button>
					</div>
				</form>
			</div>
			{todos &&
				todos.map((todo) => {
					return <p>{todo.todo}</p>;
				})}
		</div>
	);
};
