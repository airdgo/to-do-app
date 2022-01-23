import { database } from "../../firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

export const Todos = () => {
	const todoRef = useRef();
	const [todos, setTodos] = useState("");
	const { currentUser } = useAuth();
	const userDoc = doc(database, "users", currentUser.uid);

	function handleSubmit(e) {
		e.preventDefault();
		console.log(currentUser.uid);

		const id = Math.floor(Math.random() * 1000) + 1;
		const todo = todoRef.current.value;
		const newTodo = { id, todo };
		const ls = [...todos, newTodo];

		setTodos(ls);
	}

	// Write Data
	// async function handleSubmit(e) {
	// 	e.preventDefault();
	// 	console.log(currentUser.uid);

	// 	const id = Math.floor(Math.random() * 1000) + 1;
	// 	const todo = todoRef.current.value;
	// 	const newTodo = { id, todo };
	// 	const ls = [...todos, newTodo];

	// 	setTodos(ls);

	// 	const docData = { todos: ls };

	// 	try {
	// 		await setDoc(userDoc, docData);
	// 	} catch (e) {
	// 		console.error("Error adding document: ", e);
	// 	}
	// }

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
		<div className="w-full min-h-screen flex items-center flex-col bg-todos-bg">
			<div className=" w-10/12 max-w-3xl mt-40 border-2 border-white">
				<form className=" px-16 py-8" onSubmit={handleSubmit}>
					<h1 className="font-title text-6xl font-bold text-white mb-8 text-center">
						TO DO LIST
					</h1>
					<div className="flex">
						<input
							className="border-2 border-white py-1 px-2 w-10/12 max-w-md"
							type="text"
							placeholder="Add a New To Do"
							ref={todoRef}
						/>
						<div className="flex">
							<button
								className=" bg-white text-red-400 px-2 py-1 mx-4 w-24"
								type="submit"
							>
								Add Note
							</button>
							<button className="bg-white text-red-400 px-2 py-1 w-24">
								Clear List
							</button>
						</div>
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
