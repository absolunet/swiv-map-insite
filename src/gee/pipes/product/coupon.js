module.exports = (productDataModel) => {
	if (productDataModel.coupon === '') {
		delete productDataModel.coupon;
	}
};
