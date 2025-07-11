import React from 'react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from './ui/button';
import { signOut } from "firebase/auth";
import {auth} from "../../firebase"
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const logout = async () => {
        try {
            await signOut(auth);
            router.push("/")
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-[80vw] h-[10vh] bg-background text-foreground border border-border rounded-2xl m-5 flex items-center justify-around shadow-md">
            navbar
            <ModeToggle />
            <Button variant="outline" onClick={logout}>
                logout
            </Button>
        </div>
    );
};

export default Navbar;
