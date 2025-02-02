/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from 'react-toastify';

interface CreateTodoSectionProps {
    show: boolean
    onClose: () => void
    onCreate: (title: string, description: string) => void
}
interface FormErrors {
    title?: string
    description?: string
}

interface Issue {
    code?: string;
    validation?: string;
    message: string;
    path: string[];
}

interface ErrorData {
    issues: Issue[];
    name: string;
}

export const CreateTodoSection = React.memo(({ show, onClose, onCreate }: CreateTodoSectionProps) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [validationError, setValidationErrors] = useState<FormErrors>({});
    const [globalError, setGlobalError] = useState<string>("")
    console.log("Create todo section is rendering");



    useEffect(() => {
        if (!show) {
            setTitle("");
            setDescription("");
            setValidationErrors({});
            setGlobalError("");
        }
    }, [show]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const handleCreateTodo = async () => {
        try {
            setValidationErrors({});
            setGlobalError('');
            onCreate(title, description);
            toast.success('Todo created successfully.');
            setTitle('');
            setDescription('');
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<any>;
                if (axiosError.response && axiosError.response.data && axiosError.response.data.error) {
                    const errorData: ErrorData = axiosError.response.data.error;
                    if (errorData.name === 'ZodError' && errorData.issues) {
                        const zodErrors = errorData.issues.reduce((acc, issue) => {
                            acc[issue.path[0]] = issue.message;
                            return acc;
                        }, {} as { [key: string]: string });
                        setGlobalError('');
                        setValidationErrors(zodErrors);
                    }
                } else {
                    setValidationErrors({});
                    setGlobalError(axiosError.response?.data.message);
                }
            } else {
                setGlobalError(error.message);
            }
        }
    };

    if (!show) {
        return null
    }


    return (
        <>
            {/* <ToastContainer /> */}
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                <div className='bg-white dark:bg-black p-4 rounded-lg shadow-xl w-1/3 dark:border-2'>
                    <h1 className='text-2xl font-bold mb-4 text-center text-purple'>New Note</h1>
                    {globalError && <p className="text-red-500">{globalError}</p>}
                    <div className='mb-4 flex flex-col gap-4'>
                        <input onChange={handleTitleChange} value={title} className='dark:bg-black appearance-none border-b-2 dark:placeholder-white dark:border-white purple border-purple rounded w-full py-2 px-3 text-purple dark:text-white leading-tight focus:outline-none focus:shadow-outline' id='description' type='text' placeholder='Enter todo title ...' />
                        {validationError.title && <p className="text-red-500 m-2">{validationError.title}</p>}
                        <div className="relative w-full min-w-[200px]">
                            <textarea
                                onChange={handleDescriptionChange}
                                value={description}
                                className="peer h-full min-h-[100px] w-full  resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-purple outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder="">
                            </textarea>
                            <label
                                className="dark:text-white before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Description
                            </label>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={onClose}>
                            Cancel
                        </button>
                        <button className='bg-purple hover:bg-lightPurple text-white font-bold py-2 px-4 rounded' onClick={handleCreateTodo}>
                            Add Todo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
});