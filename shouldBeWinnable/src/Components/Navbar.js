import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className = 'flex justify-between items-center h-12 bg-black text-zinc-200 relative shadow-sm font-mono'>
            <Link to='/' className='pl-8'>
                Should Be Winnable
            </Link>
            <div className='px-4 curser-pointer md:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </div>
            <div className='pr-8 md:block hidden'>
                <Link className='p-4' to="/">Home</Link>
                <Link className='p-4' to="/about">About</Link>
                <Link className='p-4' to="/freebets">Free Bets</Link>
                <Link className='p-4' to="/arbitrage">Arbitrage</Link>
            </div>
        </nav>
    )
}

export default Navbar;
