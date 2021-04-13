const { RESTDataSource } = require('apollo-datasource-rest');

class VenueAPI extends RESTDataSource {
    constructor({store}) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getVenueById({ id }) {
        console.log(id)
        const res = await this.store.Venues.findAll({
            where: { id },
        });
        if (res && res.length){
            console.log("This should work")
            return res[0].dataValues;
        }else{
            console.log("This didn't work")
            return {};
        }
    }
}

module.exports = VenueAPI;
