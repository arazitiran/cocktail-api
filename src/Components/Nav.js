import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
    'Home',
    'Favorites',
    'Pricing'
]

// i know i can use navLink but i wanted to implement my knowledge
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLink: 'Home'
        };
    }

    render() {
        return (<ul className="navbar-nav">
            {
                navItems.map(link => {
                    return (<li className="nav-item">
                        <Link className={link === this.state.activeLink ? "nav-link active" : "nav-link"}
                            onClick={() => this.setState({ activeLink: link })} to={'/' + (link == "Home" ? "" : link)}> {link} </Link> 
                    </li>

                    )
                })
            }
        </ul>);
    }
}

export default Nav;