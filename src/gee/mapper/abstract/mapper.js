const NotImplementedError = require('swiv/src/gee/error/not-implemented');

module.exports = class AbstractInsiteMapper {

	constructor() {
		this.pipes = [];
	}

	map(data) {
		const mappedData = [];
		this.getDataCollection(data).forEach((item) => {
			const dataModel = this.getModel();
			this.executePipeline(dataModel, item, data);
			mappedData.push(dataModel.getData());
		});

		return mappedData;
	}

	registerPipe(pipe, order = 0) {
		this.pipes.push({ pipe, order });

		return this;
	}

	executePipeline(dataModel, rawData, context) {
		this.pipes.sort((a, b) => {
			return a.order > b.order;
		}).forEach((pipeData) => {
			pipeData.pipe(dataModel, rawData, context);
		});

		Object.keys(dataModel).forEach((k) => {
			if (typeof dataModel[k] === 'undefined') {
				delete dataModel[k];
			}
		});
	}

	getModel() {
		throw new NotImplementedError();
	}

	getModelName() {
		return this.getModel().modelName;
	}

	getDataCollection(data) {
		return data.constructor === Array ? data : [data];
	}

};
