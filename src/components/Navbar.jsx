import React from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Button } from './ui/button'
import { signOut } from "firebase/auth";

const Navbar = () => {
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className='w-[80vw] h-[10vh] bg-amber-500 rounded-2xl text-amber-200 m-5 flex items-center justify-around'>
            navbar
            <ModeToggle />
            <Button variant={"outline"} onClick={logout}>logout</Button>
        </div>
    )
}

export default Navbar
