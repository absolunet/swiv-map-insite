module.exports = (productImpressionDataModel, productDto) => {
	if (productDto.properties) {
		productImpressionDataModel.brand = productDto.brand.name;
	}
};
