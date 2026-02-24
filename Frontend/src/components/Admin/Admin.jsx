import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Admin.css';

function Admin() {
	return <>
		<Header />

		<main>
            <div className="mainButton">
                <div>
                    <button id="buttonStart">
                        Delete Product
                    </button>
                </div>
                <div>
                    <button id="buttonFormNewProduct">
                        New Product
                    </button>
                </div>
            </div>
            <div>
                <form className="formAdd hiddenElements" id="formNewProduct" action="/api/product">
                    <input type="text" placeholder="Inserisci Nome del Prodotto" />
                    <input type="text" placeholder="Inserisci il prezzo del prodotto" />
                    <button id="buttonSubmitNewProduct">Submit</button>
                </form>
            </div>
            <div>
                <ul id="productListElements">
                </ul>
            </div>

        </main>

		<Footer />
	</>
}

export default Admin;
