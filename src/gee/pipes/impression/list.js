module.exports = (productImpressionDataModel, productDto, context) => {
	productImpressionDataModel.list = context.list || (context.common ? context.common.list : null) || (context.properties ? context.properties.list : null);
};
