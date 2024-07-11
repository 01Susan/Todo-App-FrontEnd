import React, { memo } from 'react';

const options = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'uncompleted', label: 'Uncompleted' }
];


interface FilterTodoProps {
    handleFilterChange: (filter: string) => void;
}

export const FilterTodo = memo(function FilterTodo({ handleFilterChange }: FilterTodoProps) {
    console.log("Filter Component Rendering");

    return (
        <>
            <div className="relative flex items-center">
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value;
                    handleFilterChange(value)
                }} className=" appearance-none focus:outline-none bg-purple rounded w-full py-1 px-2 pr-5 text-white" name="selectFilter" defaultValue="all">
                    {options.map(option => (
                        <option key={option.value} className="bg-white dark:bg-black text-purple" value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div >
        </>
    );
}
)
