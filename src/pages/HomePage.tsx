import React, { useEffect, useState } from 'react'
import { useSearchUsersQuery } from '../store/github/github.api'
import { useDebounce } from '../hooks/debounce'

export function HomePage() {
    const [search, setSearch] = useState('')
    const debounced = useDebounce(search)
    const { isLoading, isError, data } = useSearchUsersQuery('igor')

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
                <div className='absolute top-[42px] left-0 right-0 bg-white max-h-[200px] shadow-md'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, alias?
                </div>
            </div>
        </div>
    )
}