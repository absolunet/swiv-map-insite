module.exports = (productImpressionDataModel, productDto, context) => {
	delete productImpressionDataModel.position;

	if (productDto.properties && productDto.properties.position) {
		productImpressionDataModel.position = parseInt(productDto.properties.position, 10);
	} else if (context.products) {
		const page = context.pagination ? context.pagination.currentPage : 1;
		const perPage = context.pagination ? context.pagination.pageSize : 1;
		let pos = 0;

		for (let i = context.products.length - 1; i >= 0; i--) {
			if (context.products[i].id === productDto.id) {
				pos = i;
				break;
			}
		}

		productImpressionDataModel.position = ((page - 1) * perPage) + pos + 1;
	}
};
