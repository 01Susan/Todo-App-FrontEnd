
import logo from '../assets/images/search-logo.png'
import { ChangeEvent } from 'react'
import { memo } from 'react'

interface TodoSearchProps {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const TodoSearch = memo(function TodoSearch({ handleSearch }: TodoSearchProps) {

    console.log("Search Component Rendering");

    return (
        <div className="w-full relative flex items-center">
            <input onChange={handleSearch} className="appearance-none border-2 border-purple rounded w-full py-1 px-2 text-purple leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Search note..." />
            <button className="absolute right-0 inset-y-0 flex items-center pr-2" type="button">
                <img src={logo} alt="search-logo" />
            </button>
        </div>
    )
})
