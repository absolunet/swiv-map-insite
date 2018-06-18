const getPricing = (productDto) => {
	if (productDto.pricing && productDto.pricing.unitListPrice && productDto.canShowPrice && productDto.canAddToCart) {
		return productDto.pricing.unitListPrice.toFixed(2);
	}

	return undefined;
};

module.exports = (productImpressionDataModel, productDto) => {
	productImpressionDataModel.price = getPricing(productDto);
};
