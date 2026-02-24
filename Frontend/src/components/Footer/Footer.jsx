import { NavLink } from 'react-router';

import './Footer.css';

function Footer() {
	return <footer>
		<div>
			A1
		</div>
		<div>
			A2
		</div>
		<div>
			A3
		</div>
		<NavLink to="/admin" end>
			<p>admin</p>
		</NavLink>
	</footer>
}

export default Footer;