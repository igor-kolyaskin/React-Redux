import React, { useEffect, useState } from 'react'
import { useSearchUsersQuery } from '../store/github/github.api'
import { useDebounce } from '../hooks/debounce'

export function HomePage() {
    const [search, setSearch] = useState('')
    const debounced = useDebounce(search)
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3
    })

    useEffect(() => {
        console.log(debounced)
    }, [debounced])

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-red-600'>Something went wrong...</p>}

            <div className='relative w-[560px]'>
                <input
                    type="text"
                    className='border py-2 px-4 w-full h-[42px] mb-2'
                    placeholder='Search for GitHub username...'
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
                <ul className='list-none absolute top-[42px] left-0 right-0 bg-white max-h-[200px] shadow-md overflow-y-scroll'>
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {data?.map(user =>
                        <li
                            key={user.id}
                            className='py-2 px-4 hover:bg-gray-500 hover:text-white cursor-pointer transition-colors'
                        >
                            {user.login}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}