module.exports = (productImpressionDataModel, productDto) => {
	productImpressionDataModel.name = productDto.shortDescription;
};
