import { FaRegCircle, FaRegCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { useRef } from "react";
import { useTodos } from "../../context/TodosProvider";

export const Todos = () => {
	const todoRef = useRef();
	const { todos, handleSubmit, handleCompletition, handleDelete, clearList } =
		useTodos();

	return (
		<div className="w-full min-h-screen flex items-center flex-col bg-todos-bg">
			<div className="w-10/12 max-w-3xl">
				<div className="w-full mt-28 border-2 border-white">
					<form
						className=" px-16 py-8"
						onSubmit={(e) => handleSubmit(e, todoRef.current.value)}
					>
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
								<button
									className="bg-white text-[#aa3333] font-button px-2 py-1 w-24 whitespace-nowrap"
									onClick={(e) => clearList(e)}
								>
									Clear List
								</button>
							</div>
						</div>
					</form>
				</div>
				<div>
					{todos &&
						todos.map((todo, index) => {
							return (
								<div
									key={index}
									className="bg-white font-mono flex items-center w-full px-3 py-2 my-4 border rounded"
								>
									{todo.isCompleted === false ? (
										<FaRegCircle
											className="text-3xl text-green-800 cursor-pointer hover:opacity-80"
											onClick={() => handleCompletition(todo.id)}
										/>
									) : (
										<FaRegCheckCircle
											className="text-3xl text-green-800 cursor-pointer hover:opacity-80"
											onClick={() => handleCompletition(todo.id)}
										/>
									)}
									<p className={`mx-4 ${todo.isCompleted && "line-through"}`}>
										{todo.todo}
									</p>
									<FaRegTrashAlt
										className=" bg-[#9c0000] text-white text-3xl py-1 px-2 rounded cursor-pointer ml-auto hover:opacity-80"
										onClick={() => handleDelete(todo.id)}
									/>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};
