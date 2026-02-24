import { NavLink } from 'react-router';

import './Header.css';

function Header() {
    return <header className="headerECommerce">
        <div>
            <NavLink to="/products" end>
                <p>Product Elements</p>
            </NavLink>
        </div>
        <div>
            <NavLink to="/" end>
                <h1 className="title">HomePage</h1>
            </NavLink>
        </div>
        <div>
            <NavLink to="/cart" end>
                <img src="./img/5166615.png" className="cart" />
            </NavLink>
        </div>
    </header>
}

export default Header;