import { FaRegCircle, FaRegCheckCircle, FaRegTrashAlt } from "react-icons/fa";
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
			<div className="w-10/12 max-w-3xl">
				<div className="w-full mt-28 border-2 border-white">
					<form className=" px-16 py-8" onSubmit={handleSubmit}>
						<h1 className="font-title text-6xl font-bold text-white mb-8 text-center">
							TO DO LIST
						</h1>
						<div className="flex">
							<input
								className="border-2 border-white font-mono py-1 px-2 w-10/12 max-w-md"
								type="text"
								placeholder="Add a New To Do"
								ref={todoRef}
							/>
							<div className="flex">
								<button
									className=" bg-white text-[#aa3333] font-button px-2 py-1 mx-4 w-24 whitespace-nowrap"
									type="submit"
								>
									Add Note
								</button>
								<button className="bg-white text-[#aa3333] font-button px-2 py-1 w-24 whitespace-nowrap">
									Clear List
								</button>
							</div>
						</div>
					</form>
				</div>
				<div>
					{todos &&
						todos.map((todo) => {
							return (
								<div className="bg-white font-mono flex items-center w-full px-3 py-2 my-4 border rounded">
									<FaRegCircle className="text-3xl text-green-800 cursor-pointer hover:opacity-80" />
									<p className="mx-4">{todo.todo}</p>
									<FaRegTrashAlt className=" bg-[#9c0000] text-white text-3xl py-1 px-2 rounded cursor-pointer ml-auto hover:opacity-80" />
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};
