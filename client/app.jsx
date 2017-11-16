'use strict';

var React = require('react');
var $ = require('jquery');
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
			sku: document.getElementById('skuEl').value
		};
		socket.emit('send:product', JSON.stringify(promoProduct));
		$.ajax({
      method: 'GET',
      url: "http://api.vtex.com/elektra/dataentities/OR/search/?_fields=id,sku,last",
      success: function(data, textStatus, xhr){
        if (data.length == 0) {
					var data = {
						sku: document.getElementById('skuEl').value,
						last: true
					}

					$.ajax({
						method: 'PATCH',
						url: "http://api.vtex.com/elektra/dataentities/OR/documents/",
						data: JSON.stringify(data),
						success: function(data, textStatus, xhr){
						}
					});
        } else {
					var data = {
						sku: document.getElementById('skuEl').value,
						last: true
					}
					$.ajax({
						method: 'PUT',
						url: "http://api.vtex.com/elektra/dataentities/OR/documents/" + action.id,
						data: JSON.stringify(data),
						processData: false,
						success: function(data){
						}
					});
        }
        AppStore.emitChange();
      }
    });
	},
	render() {
		return (
			<div>
				<label>SKU:</label>
				<input id="skuEl" type="text" />

				<br></br>
				<br></br>
				<input type="button" value="Send Promo" onClick={() => this.sendPromo()}/>
			</div>
		);
	}
});

React.render(<PushProductApp/>, document.getElementById('app'));
