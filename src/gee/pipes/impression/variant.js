module.exports = (productImpressionDataModel, productDto) => {
	productImpressionDataModel.variant = productDto.name || productDto.shortDescription;

	if (productImpressionDataModel.variant === productImpressionDataModel.name) {
		delete productImpressionDataModel.variant;
	}
};
