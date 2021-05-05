const { RESTDataSource } = require('apollo-datasource-rest');

class BeaconAPI extends RESTDataSource {
    constructor({store}) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async verifyBeacons({ id }) {
        let results = [];

        for (const beaconAddr of id) {
            const res = await this.verifyBeacon({ beaconAddr });
            if (res) results.push(res);
        }

        return results;
    }

    async verifyBeacon({ beaconAddr }) {
        const res = await this.store.Beacons.findAll({
            where: { beaconAddr },
        });
        if (res && res.length){
            return res[0].dataValues;
        }else{
            return null;
        }
    }

    async getBeaconById({ beaconAddr }) {
        const res = await this.store.Beacons.findAll({
            where: { beaconAddr },
        });
        if (res && res.length){
            return res[0].dataValues;
        }else{
            return {};
        }
    }
}

module.exports = BeaconAPI;
