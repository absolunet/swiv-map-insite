module.exports = (productDataModel, productDto, context) => {
	productDto.properties = productDto.properties || {};
	if (productDataModel.price) {
		if (typeof productDataModel.quantity !== 'undefined') {
			[productDataModel.quantity] = [
				productDto.qtyAdded,
				productDto.qtyRemoved,
				productDto.properties.qtyAdded,
				productDto.properties.qtyRemoved,
				context.qtyAdded,
				context.qtyRemoved,
				productDto.qtyOrdered
			].filter((value) => {
				return typeof value !== 'undefined';
			});
		}
	} else {
		delete productDataModel.quantity;
	}
};
