import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components_css/header.css'
import Nav from './Nav';

function Header() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-danger nav-style">
            <div className="navbar-header">
            <Link className="navbar-brand" href="#"><h1> Cocktailzirad  </h1></Link> {/*add active  li to class to make this active*/}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                <span className="navbar-toggler-icon"></span>
            </button>
            </div>

            
            <div className="container-fluid">
            <div className="collapse navbar-collapse">
                <Nav/>
            </div>
            </div>
        </nav>
    );
}

export default Header;
