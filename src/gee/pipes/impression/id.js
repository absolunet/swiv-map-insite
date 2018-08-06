module.exports = (productImpressionDataModel, productDto) => {
	productImpressionDataModel.id = productDto.productId || productDto.id;
};
