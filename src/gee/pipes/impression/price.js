module.exports = (productImpressionDataModel, productDto) => {
	productImpressionDataModel.price = productDto.pricing.unitListPrice || undefined;
};
