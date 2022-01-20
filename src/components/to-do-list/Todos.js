import { database } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRef, useEffect, useState } from "react";

export const Todos = () => {
	const todoRef = useRef();
	const [todos, setTodos] = useState("");
	const todosCollection = collection(database, "todos");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const docRef = await addDoc(todosCollection, {
				todo: todoRef.current.value,
			});

			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	useEffect(() => {
		const getTodos = async () => {
			const data = await getDocs(todosCollection);
			setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getTodos();
	}, [todos]);

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
