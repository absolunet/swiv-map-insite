module.exports = (productImpressionDataModel, productDto) => {
	if (productDto.pricing) {
		productImpressionDataModel.price = productDto.pricing.unitListPrice || undefined;
	}
};
