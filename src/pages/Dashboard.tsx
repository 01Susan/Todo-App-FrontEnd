import { TodoSearch } from '../components/TodoSearch'
import { FilterTodo } from '../components/FilterTodo'
import { DarkMode } from '../components/DarkMode'
import { TodoList } from '../components/TodoList'
import { AddTodoBtn } from '../components/AddTodoBtn'
import { CreateTodoSection } from '../components/CreateTodoSection'
import { useCallback, useState, useEffect, ChangeEvent } from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify';
import axios from 'axios';


interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    showDescription?: boolean;
}
export function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filterTodos, setFilterTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        try {
            const fetchTodos = async () => {
                const token = localStorage.getItem('token')
                const url = import.meta.env.VITE_BASE_URL_DEV
                const response = await axios.get(`${url}/todo`, {
                    headers: {
                        "authorization": `Bearer ${token}`,
                        'content-type': 'application/json'
                    }
                })
                const responseData = response.data.data
                const todoWithMetaData = responseData.map((todo: Todo) => {
                    return {
                        ...todo,
                        showDescription: false
                    }
                })
                setTodos(todoWithMetaData)
                setFilterTodos(todoWithMetaData)
            }
            fetchTodos()
        } catch (error) {
            toast.error("Failed to fetch todos. Please try again later.")
        }
    }, []);

    useEffect(() => {
        applyFilter(filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos, filter]);

    const handleToggleDescription = useCallback((id: string): void => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, showDescription: !todo.showDescription } : todo
            )
        );
    }, [])
    const handleTodoCompletion = useCallback(async (todoId: string, completed: boolean): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            const url = import.meta.env.VITE_BASE_URL_DEV;
            await axios.put(`${url}/todo/${todoId}`, { completed }, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            });
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
                )
            );
        } catch (error) {
            console.log(error);
        }
    }, [])
    const deleteTodo = useCallback(async (todoId: string): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            const url = import.meta.env.VITE_BASE_URL_DEV;
            await axios.delete(`${url}/todo/${todoId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            });
            toast.success("Todo deleted successfully.");

            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        } catch (error) {
            toast.error("Failed to delete todo.");
        }
    }, [])
    const handleAddTodoClick = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleCreateTodo = useCallback(async (title: string, description: string) => {
        try {
            const url = import.meta.env.VITE_BASE_URL_DEV;
            const data = {
                title: title,
                description: description
            }
            const token = localStorage.getItem('token')

            const response = await axios.post(`${url}/todo`, data,
                {
                    headers: {
                        "authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            const newTodo = { ...response.data.data, showDescription: false };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        } catch (error) {
            console.log(error);
        }
    }, [])

    const debounce = useCallback(_.debounce(async (value: string): Promise<void> => {
        console.log("debounce called");
        const url: string = import.meta.env.VITE_BASE_URL_DEV;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}/todo/search`, {
            headers: {
                "authorization": `Bearer ${token}`,
                'content-type': 'application/json'
            },
            params: {
                filter: value
            }
        })
        const searchedTodos = response.data.data.map((todo: Todo) => {
            return {
                ...todo,
                showDescription: false
            }
        });
        setTodos(searchedTodos);
    }, 300), []);

    const applyFilter = useCallback((filter: string): void => {
        switch (filter) {
            case "all":
                return setFilterTodos(todos);
            case "completed":
                return setFilterTodos(todos.filter((todo) => todo.completed));
            case "uncompleted":
                return setFilterTodos(todos.filter((todo) => !todo.completed));
            default:
                return setFilterTodos(todos);
        }
    }, [todos]);

    const handleFilterChange = useCallback((filter: string): void => {
        setFilter(filter);
    }, [])

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        debounce(value);
    }, [debounce]);

    return (
        <div className='flex justify-center dark:bg-black'>
            <div className='flex flex-col h-screen items-center w-1/2 p-2 my-10 relative'>
                <h1 className='text-3xl font-bold text-center text-purple'>TODO LIST</h1>
                <div className='grid sm:grid-cols-12 gap-2 mt-10'>
                    <div className="col-span-9">
                        <TodoSearch handleSearch={handleSearch} />
                    </div>
                    <div className="col-span-2">
                        <FilterTodo handleFilterChange={handleFilterChange} />
                    </div>
                    <div className='col-span-1'>
                        <DarkMode />
                    </div>
                </div>
                <div className='w-full relative'>
                    <div className='w-full mt-12'>
                        <
                            TodoList
                            todos={filterTodos}
                            handleToggleDescription={handleToggleDescription}
                            handleTodoCompletion={handleTodoCompletion}
                            deleteTodo={deleteTodo}
                        />
                    </div>
                    <div className='sticky bottom-10 flex justify-end mr-4 mt-20'>
                        <AddTodoBtn onclick={handleAddTodoClick} />
                    </div>
                </div>
            </div>
            <CreateTodoSection show={showModal} onClose={handleCloseModal} onCreate={handleCreateTodo} />
        </div>
    )
}