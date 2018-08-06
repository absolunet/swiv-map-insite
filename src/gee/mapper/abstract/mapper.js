const NotImplementedError = require('swiv/src/gee/error/not-implemented');
// const resolve = require('swiv/src/utils/resolve');

module.exports = class AbstractInsiteMapper {

	constructor() {
		this.pipes = [];
	}

	getMappedData(data, event) {
		const mainData = this.getMappedMainData(data, event);
		const miscData = this.getMiscData(data);

		const dataProps = data instanceof Array ? [] : Object.keys(data);
		const miscDataProps = Object.keys(miscData);
		const miscIsMain = dataProps.every((val) => {
			return miscDataProps.indexOf(val) > -1;
		});

		const mappedData = {
			main: mainData
		};

		if (mainData instanceof Array || !miscIsMain) {
			mappedData.misc = miscData;
		}

		return mappedData;
	}

	getMappedMainData(data, event) {
		const mappedData = [];
		this.getDataCollection(data).forEach((item) => {
			const dataModel = this.getModel();
			this.executePipeline(dataModel, item, data, event);
			mappedData.push(dataModel.getData());
		});

		return mappedData;
	}

	getMiscData(data) {
		return data.misc || {};
	}

	getMainDataKeys() {
		return ['main'];
	}

	registerPipe(pipe, order = 0) {
		this.pipes.push({ pipe, order });

		return this;
	}

	executePipeline(dataModel, ...args) {
		this.pipes.sort((a, b) => {
			return a.order > b.order;
		}).forEach((pipeData) => {
			pipeData.pipe(dataModel, ...args);
		});

		this.cleanDataModel(dataModel);
	}

	cleanDataModel(dataModel) {
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
