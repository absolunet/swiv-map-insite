const getPositionFromPagination = (pagination, products, productDto) => {
	const page = pagination ? pagination.currentPage : 1;
	const perPage = pagination ? pagination.pageSize : 1;
	let pos = 0;

	for (let i = products.length - 1; i >= 0; i--) {
		if (products[i].id === productDto.id) {
			pos = i;
			break;
		}
	}

	return ((page - 1) * perPage) + pos + 1;
};

module.exports = (productImpressionDataModel, productDto, context) => {
	delete productImpressionDataModel.position;
	if (context.common && context.common.position) {
		productImpressionDataModel.position = context.common.position;
	} else if (productDto.properties && productDto.properties.position) {
		productImpressionDataModel.position = productDto.properties.position;
	} else if (context.common && context.common.pagination) {
		productImpressionDataModel.position = getPositionFromPagination(context.common.pagination, context.main, productDto);
	} else if (context.products) {
		productImpressionDataModel.position = getPositionFromPagination(context.pagination, context.products, productDto);
	}

	if (productImpressionDataModel.position) {
		productImpressionDataModel.position = parseInt(productImpressionDataModel.position, 10);
	}
};
