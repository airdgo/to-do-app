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
						className=" px-10 py-6 md:px-16 md:py-10"
						onSubmit={(e) => handleSubmit(e, todoRef.current.value)}
					>
						<h1 className="font-title text-5xl font-bold text-white mb-6 text-center md:text-6xl">
							TO DO LIST
						</h1>
						<div className="flex flex-col items-center md:flex-row md:justify-between">
							<input
								className="border-2 border-white font-mono text-sm py-1 px-2 mb-4 w-full max-w-md md:mb-0 md:text-base"
								type="text"
								placeholder="Add a New To Do"
								ref={todoRef}
							/>
							<div className="flex w-full justify-around md:justify-start md:w-fit">
								<button
									className=" bg-white text-[#aa3333] font-button text-sm px-2 py-1 w-24 whitespace-nowrap md:mx-4 md:text-base"
									type="submit"
								>
									Add Note
								</button>
								<button
									className="bg-white text-[#aa3333] font-button text-sm px-2 py-1 w-24 whitespace-nowrap md:text-base"
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
