module.exports = (productImpressionDataModel, productDto, context) => {
	const page = context.pagination ? context.pagination.currentPage : 1;
	const perPage = context.pagination ? context.pagination.pageSize : 1;
	let pos = 0;

	if (context.products) {
		for (let i = context.products.length - 1; i >= 0; i--) {
			if (context.products[i].id === productDto.id) {
				pos = i;
				break;
			}
		}
	}

	productImpressionDataModel.position = ((page - 1) * perPage) + pos + 1;
};
