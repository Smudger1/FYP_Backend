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
        const res = await this.store.Venues.findAll({
            where: { id },
        });
        if (res && res.length){ // If found
            return res[0].dataValues;
        }else{ // else
            return {};
        }
    }

    async getVenueBeacons({ venueId }) {
        const res = await this.store.Beacons.findAll({
            where: { venueId }
        });

        return res.map(l => l.dataValues).filter(l => !!l)
    }
}

module.exports = VenueAPI;
