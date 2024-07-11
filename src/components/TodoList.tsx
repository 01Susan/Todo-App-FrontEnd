import checklogo from '../assets/images/Detective-check-footprint.png'
import { memo } from 'react'

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    showDescription?: boolean;
}

// Define props interface for TodoList component
interface TodoListProps {
    todos: Todo[]; // Array of Todo objects
    handleToggleDescription: (id: string) => void; // Function to toggle description
    handleTodoCompletion: (id: string, completed: boolean) => void; // Function to handle completion of a todo
    deleteTodo: (id: string) => void; // Function to delete a todo
}
export const TodoList = memo(function TodoList({ todos, handleToggleDescription, handleTodoCompletion, deleteTodo }: TodoListProps) {
    return (
        <>
            {
                todos.length === 0
                    ? (
                        <div className='flex justify-center items-center'>
                            <img src={checklogo} alt="" />
                        </div>)
                    : (
                        todos.map((todo) => {

                            return (
                                <div className="mt-4" key={todo.id}>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            className="w-5 h-5 border-2 border-purple text-green-600 focus:ring-0 focus:ring-offset-0"
                                            onChange={(e) => { handleTodoCompletion(todo.id, e.target.checked) }}
                                        />
                                        <div className="flex-1">
                                            {
                                                todo.completed ? (
                                                    <h3 className="text-2xl font-semibold dark:text-white text-purple">
                                                        <s>
                                                            {todo.title}
                                                        </s>
                                                    </h3>)
                                                    :
                                                    (
                                                        <h3 className="text-2xl font-semibold dark:text-white text-purple">
                                                            {todo.title}
                                                        </h3>
                                                    )
                                            }
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={handleToggleDescription.bind(null, todo.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-lightPurple hover:text-purple dark:hover:text-white  dark:text-white ">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                            <button onClick={deleteTodo.bind(null, todo.id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5 hover:text-red-700 text-lightPurple dark:text-white dark:hover:text-red-700"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    {todo.showDescription ? <div className="border-2 border-lightPurple rounded-md my-2 p-4">
                                        <p className="text-lightPurple dark:text-white">{todo.description ? todo.description : "Empty description ..."}</p>
                                    </div> : <div></div>}
                                    <div className="bg-lightPurple w-full h-0.5 mt-5"></div>
                                </div>
                            )
                        }))
            }
        </>
    )
})