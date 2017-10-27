'use strict';

var React = require('react');

var socket = io.connect();

var PushProductApp = React.createClass({
	componentDidMount() {
		socket.on('receive:product', this.productRecieve);
	},
	productRecieve(product) {
		console.log('P', product);
	},
	sendPromo() {
		var promoProduct = {
			sku: document.getElementById('skuEl').value,
			img: document.getElementById('imgEl').value,
			precio: document.getElementById('precioEl').value
		};
		socket.emit('send:product', JSON.stringify(promoProduct));
	},

	render() {
		return (
			<div>
				<label>SKU:</label>
				<input id="skuEl" type="text" />
				<br></br>
				<br></br>
				<label>Img:</label>
				<input id="imgEl" type="text" />
				<br></br>
				<br></br>
				<label>Precio:</label>
				<input id="precioEl" type="text" />
				<br></br>
				<br></br>
				<input type="button" value="Send Promo" onClick={() => this.sendPromo()}/>
			</div>
		);
	}
});

React.render(<PushProductApp/>, document.getElementById('app'));
