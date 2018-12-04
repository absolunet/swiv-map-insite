const getPricing = (productDto) => {
	if (productDto.pricing && !productDto.pricing.requiresRealTimePrice && productDto.pricing.unitNetPrice && (typeof productDto.canShowPrice === 'undefined' || productDto.canShowPrice) && productDto.canAddToCart) {
		return productDto.pricing.unitNetPrice.toFixed(2);
	}

	return undefined;
};

module.exports = (productImpressionDataModel, productDto) => {
	productImpressionDataModel.price = getPricing(productDto);
};
