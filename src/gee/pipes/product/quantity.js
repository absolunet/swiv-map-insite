module.exports = (productDataModel, productDto) => {
	if (productDataModel.price) {
		productDataModel.quantity = productDto.quantity;
	} else {
		delete productDataModel.quantity;
	}
};
