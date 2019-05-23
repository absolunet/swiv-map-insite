module.exports = (productImpressionDataModel, productDto) => {
	if (productDto.brand) {
		productImpressionDataModel.brand = productDto.brand.name;
	}
};
