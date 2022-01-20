import { database } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRef } from "react";

export const Todos = () => {
	const todoRef = useRef();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const docRef = await addDoc(collection(database, "todos"), {
				todo: todoRef.current.value,
			});

			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	return (
		<div className="w-full h-full flex justify-center items-center">
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
		</div>
	);
};
