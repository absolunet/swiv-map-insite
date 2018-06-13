const AbstractInsiteMapper = require('./abstract/mapper');

module.exports = class InsiteProductDataModelMapper extends AbstractInsiteMapper {

	map(data) {
		const page = data.pagination ? data.pagination.currentPage : 1;
		const perPage = data.pagination ? data.pagination.pageSize : 1;

		return (data.products || [data.product || data]).map((productDto, i) => {
			return this.mapOne(productDto, {
				position: ((page - 1) * perPage) + i + 1,
				list: this.getListContext(data),
				category: this.getCategory(productDto, data)
			});
		});
	}

	mapOne(productDto, data = {}) {
		const product = {
			id: productDto.id,
			name: productDto.shortDescription,
			list: this.getListContext(),
			brand: productDto.properties.brand || '',
			category: productDto.properties.category || '',
			variant: productDto.name || productDto.shortDescription,
			position: 1,
			price: productDto.pricing.unitListPrice
		};

		Object.keys(data).forEach((k) => {
			product[k] = data[k];
		});

		Object.keys(product).forEach((k) => {
			if (typeof product[k] === 'undefined') {
				delete product[k];
			}
		});

		if (product.variant === product.name) {
			delete product.variant;
		}

		if (product.price === 0) {
			delete product.price;
		}

		return product;
	}

	getListContext(data = {}) {
		if (data.products) {
			return this.getListContextBySlug(data.originalQuery ? 'search' : 'list');
		}

		return this.getListContextBySlug('detail');
	}

	getCategory(productDto, context = {}) {
		if (context.properties && context.properties.category) {
			return context.properties.category.shortDescription;
		}

		let resolvedCategory = window.location.pathname.substr(1)
			.replace(/-/g, ' ')
			.split('/')
			.map((category) => {
				return `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
			})
			.join('/');

		if (context.product) {
			resolvedCategory = resolvedCategory.replace(/\/[^/]{1,}$/, '');
		}

		return resolvedCategory;
	}

	getListContextBySlug(slug) {
		const context = {
			search: 'Search Results',
			list: 'List Page',
			detail: 'Detail Page'
		};

		return context[slug] || null;
	}

};
