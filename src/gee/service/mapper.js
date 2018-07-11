module.exports = class InsiteMapperService {

	constructor() {
		const mappers = [
			{
				mapper: require('./../mapper/action-field'),
				defaultPipes: require('./../pipes/action-field')
			},
			{
				mapper: require('./../mapper/impression'),
				defaultPipes: require('./../pipes/impression')
			},
			{
				mapper: require('./../mapper/promotion'),
				defaultPipes: require('./../pipes/promotion')
			},
			{
				mapper: require('./../mapper/product'),
				defaultPipes: require('./../pipes/product')
			}
		];

		this.mappers = {};

		mappers.forEach((mapperData) => {
			const MapperClass = mapperData.mapper;
			const mapper = new MapperClass();
			const event = mapper.getModelName();
			this.mappers[event] = mapper;

			mapperData.defaultPipes.forEach((pipe) => {
				this.registerPipe(event, pipe);
			});
		});
	}

	map(data, event) {
		const mapper = this.getDedicatedMapper(event);
		const mappedData = mapper ? mapper.getMappedData(data, event) : data;

		if (mappedData && (mappedData.constructor !== Array || mappedData.length > 0)) {
			const mainData = mappedData.main || mappedData;
			const miscData = mappedData.misc || null;

			event.setMainData(mainData);

			if (miscData) {
				Object.keys(miscData).forEach((miscDataKey) => {
					event.ecommerce[miscDataKey] = miscData[miscDataKey];
				});
			}

			return event.getData();
		}

		return null;
	}

	registerPipe(event, pipe, order = 0) {
		const mapper = this.getDedicatedMapper(event);

		if (mapper) {
			mapper.registerPipe(pipe, order);
		}
	}

	getDedicatedMapper(event) {
		return this.mappers[event] || this.mappers[event.getMainDataType().modelName] || null;
	}

};
