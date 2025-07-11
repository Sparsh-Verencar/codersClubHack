import React from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'

const Navbar = () => {
    return (
        <div className='w-[80vw] h-[10vh] bg-amber-500 rounded-2xl text-amber-200 m-5 flex items-center justify-around'>
            navbar
            <ModeToggle />
        </div>
    )
}

export default Navbar
