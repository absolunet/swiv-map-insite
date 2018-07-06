module.exports = (productImpressionDataModel, productDto, context) => {
	const lists = {
		search: 'Search Results',
		list: 'List Page',
		detail: 'Detail Page'
	};

	productImpressionDataModel.list = typeof context.list !== 'undefined' ? context.list
		: (context.properties ? context.properties.list : null) || (context.products ? lists[context.originalQuery ? 'search' : 'list'] : lists.detail);
};
