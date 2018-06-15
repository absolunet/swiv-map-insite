const resolveCategory = (productDto, context) => {
	if (productDto.properties && productDto.properties.category) {
		return productDto.properties.category;
	}

	if (context.properties && context.properties.category) {
		return context.properties.category;
	}

	let resolvedCategory = window.location.pathname.substr(1)
		.replace(/-/g, ' ')
		.split('/')
		.map((category) => {
			return `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
		})
		.join('/');

	if (context.product) {
		resolvedCategory = resolvedCategory.replace(/\/[^/]{1,}$/, '');
	}

	return resolvedCategory;
};

module.exports = (productImpressionDataModel, productDto, context) => {
	productImpressionDataModel.category = resolveCategory(productDto, context);
};
