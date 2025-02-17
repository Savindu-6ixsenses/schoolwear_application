import React from 'react'
import LogoutButton from './LogoutButton'

const Header = () => {
  return (
    <div className='w-full border-2 h-[78px] bg-[#D9D9D9] place-items-start items-center max-lg:pl-3 lg:pl-6 flex '>
        <div className='flex-auto w-[274px] h-[47px] border-2 border-red-600 hover:cursor-pointer justify-center text-black py-2 text-center'>
           Logo Image
        </div>
        <div>
          <LogoutButton/>
        </div>
    </div>
  )
}

export default Header