import { NavLink } from "react-router-dom";



export function AppHeader() {

    return (
        <header className="app-header">
            <h1>Toy store</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/store">Stores</NavLink> |
                <NavLink to="/about">About</NavLink> 
            </nav>
        </header>
    );
}