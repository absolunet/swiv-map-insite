if (window.swiv && window.swiv.gee) {
	const InsiteMapperService = require('./service/mapper');
	window.swiv.gee.setMapperService(new InsiteMapperService());
}
