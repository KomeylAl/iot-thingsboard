import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
  return (
    <div className='w-full md:w-[40%] rounded-full shadow-sm px-4 bg-white h-10 flex items-center gap-2'>
      <BiSearch size={20} className='text-gray-500' />
      <input type="text" placeholder='جستجو' className='w-full focus:ring-0 focus:border-none ring-0 border-none' />
    </div>
  )
}

export default SearchBar