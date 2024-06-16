import Navbar from "./Components/Navbar"
import { Routes, Route } from 'react-router-dom'
import Home from "./Pages/home";
import About from "./Pages/about";

function Main() {

    return (
        <div className='pog'>
            <Navbar />
            <Routes>
                <Route path='/' Component={Home}/>
                <Route path='/about' Component={About}/>
                <Route path='/freebets' Component={Home}/>
                <Route path='/arbitrage' Component={Home}/>
            </Routes>

        </div>
    )
}

export default Main;
