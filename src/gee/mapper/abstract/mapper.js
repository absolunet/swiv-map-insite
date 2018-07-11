const NotImplementedError = require('swiv/src/gee/error/not-implemented');
const resolve = require('swiv/src/utils/resolve');

module.exports = class AbstractInsiteMapper {

	constructor() {
		this.pipes = [];
	}

	getMappedData(data) {
		const mainData = this.getMappedMainData(data);
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

	getMappedMainData(data) {
		const mappedData = [];
		this.getDataCollection(data).forEach((item) => {
			const dataModel = this.getModel();
			this.executePipeline(dataModel, item, data);
			mappedData.push(dataModel.getData());
		});

		return mappedData;
	}

	getMiscData(data) {
		const clone = JSON.parse(JSON.stringify(data));

		this.getMainDataKeys().forEach((key) => {
			const keyList = key.split('.');
			const lastKey = keyList.pop();
			const container = keyList.length ? resolve(keyList.join('.'), clone) || {} : clone;

			delete container[lastKey];
		});

		return clone || {};
	}

	getMainDataKeys() {
		return [];
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
