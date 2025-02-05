import React from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
        <div className="overlay">
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src="images/ska-logo.png" alt="SKA Logo" />
                </Link>
            </div>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X /> : <Menu />}
            </button>
            
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/info" className="nav-link">Info</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
            </div>
        </nav>
        </div>
        <div className={`menu ${menuOpen ? "show-navbar" : ""}`}>
        <Link to="/" className="menu-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/info" className="menu-link" onClick={() => setMenuOpen(false)}>Info</Link>
        <Link to="/contact" className="menu-link" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
    </>
    );
}

export default Navbar;