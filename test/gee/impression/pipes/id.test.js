'use strict';

const pipe = require('./../../../../src/gee/pipes/impression/id');
const ProductDataModel = require('swiv/src/gee/model/data/impression');

describe('GEE', () => {
	describe('impression', () => {
		describe('pipes', () => {
			describe('id', () => {
				let productDataModel;

				beforeEach(() => {
					productDataModel = new ProductDataModel();
				});

				test('ProductDto ID is correctly mapped', () => {
					const fakeProductDto = {
						id: '0a66037d-d45a-45e7-8957-80c969f5269a'
					};

					expect(productDataModel.id).toBeFalsy();
					pipe(productDataModel, fakeProductDto);

					expect(productDataModel.id).toBe(fakeProductDto.id);
				});
			});
		});
	});
});
