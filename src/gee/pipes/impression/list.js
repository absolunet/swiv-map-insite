module.exports = (productImpressionDataModel, productDto, context) => {
	productImpressionDataModel.list = context.list || (context.properties ? context.properties.list : null);
};
