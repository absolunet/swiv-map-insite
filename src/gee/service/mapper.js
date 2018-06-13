module.exports = class InsiteMapperService {

	constructor() {
		const mappers = [
			require('./../mapper/action-field'),
			require('./../mapper/promotion'),
			require('./../mapper/product')
		];

		this.mappers = {};

		mappers.forEach((Mapper) => {
			const mapper = new Mapper();
			this.mappers[mapper.getModelName()] = mapper;
		});
	}

	map(data, event) {
		const mapper = this.getDedicatedMapper(event.getMainDataType().name);
		const mappedData = mapper ? mapper.map(data) : data;

		if (mappedData && (mappedData.constructor !== Array || mappedData.length > 0)) {
			event.setMainData(mappedData);

			return event.getData();
		}

		return null;
	}

	getDedicatedMapper(event) {
		return this.mappers[event] || null;
	}

};
