import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './PLP.css';

function PLP() {
	return <>
		<Header />

		<main>
			<div id="products">
				<div class="containerFlex">
					<div id="prodtit">
						<strong>PRODUCTS</strong>
					</div>
					<br/>
					<div class="containerGrid">
						<div class="elmenu">
							menù layout
							<div class="container-flex-menu">
								<div class="element-container-flex-menu">
									aaa
								</div>
							</div>
						</div>
						<div class="containerFlex1">
							<div class="ell">
							</div>
						</div>
						<div class="plp-foot">
						</div>
					</div>
				</div>
			</div>
		</main>

		<Footer />
	</>
}

export default PLP;
