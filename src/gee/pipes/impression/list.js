module.exports = (productImpressionDataModel, productDto, context) => {
	const lists = {
		search: 'Search Results',
		list: 'List Page',
		detail: 'Detail Page'
	};

	productImpressionDataModel.list = context.products ? lists[context.originalQuery ? 'search' : 'list'] : lists.detail;
};