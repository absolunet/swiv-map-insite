module.exports = (promotionDataModel, promotionDto) => {
	promotionDataModel.name = promotionDto.promotionCode || promotionDto.name;
};
