import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Home.css';

function Home() {
	return <>
		<Header />

		<main className="mainECommerce">
			<div>
				<ul className="carousels">
					<li data-accName="Item 1" className="carouselsList">
						<h2>Forza</h2>
					</li>
					<li data-accName="Item 2" className="carouselsList">
						<h2>Roma</h2>
					</li>
					<li data-accName="Item 3" className="carouselsList">
						<h2>Forza</h2>
					</li>
					<li data-accName="Item 4" className="carouselsList">
						<h2>Lupi</h2>
					</li>
				</ul>
			</div>
		</main>

		<Footer />
	</>
}

export default Home;
