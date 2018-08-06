module.exports = (productDataModel, productDto, context, event) => {
	const properties = productDto.properties || {};
	if (['productClick', 'productDetail'].indexOf(event.event) === -1 &&
		productDataModel.price &&
		typeof productDataModel.quantity !== 'undefined') {
		[productDataModel.quantity] = [
			productDto.qtyAdded,
			productDto.qtyRemoved,
			properties.qtyAdded,
			properties.qtyRemoved,
			context.qtyAdded,
			context.qtyRemoved,
			productDto.qtyOrdered
		].filter((value) => {
			return typeof value !== 'undefined';
		});
	} else {
		delete productDataModel.quantity;
	}
};
