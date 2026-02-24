import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Cart.css';

function Cart() {
	return <>
		<Header />

        <main>
            <div className="cc-product-list">
            </div>
            <div className="cc-cart-summary">
                <div className="cc-price-summary">
                    <div>
                        <p>Totale carrello</p>
                        <p id="cart-total" className="cc-price-tag"></p>
                    </div>

                    <div>
                        <p>Spedizione</p>
                        <p id="shipping-total" className="cc-price-tag"></p>
                    </div>

                    <div>
                        <p>Totale</p>
                        <p id="payment-total" className="cc-price-tag"></p>
                    </div>
                </div>

                <div className="cc-payment-options">
                    <button id="payment-button"></button>
                    <p>Oppure paga con</p>
                    <div>
                        <button style={{backgroundColor: "#222d65", color: "#eeeeee" }}>PayPal</button>
                        <button style={{backgroundColor: "#ffa8cd", color: "#0b051d" }}>Klarna</button>
                    </div>
                </div>
            </div>
        </main>

		<Footer />
	</>
}

export default Cart;
