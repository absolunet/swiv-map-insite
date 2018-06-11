module.exports = class AbstractInsiteMapper {

    map(data) {
        return data;
    }

    getModelName() {
        return this.constructor.name.replace(/^Insite(.*)Mapper$/, '$1');
    }
};
