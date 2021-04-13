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

        console.log(id)

        for (const beaconAddr of id) {
            const res = await this.verifyBeacon({ beaconAddr });
            if (res) results.push(res);
            console.log(results)
        }

        return results;
    }

    async verifyBeacon({ beaconAddr }) {
        console.log(beaconAddr)
        const res = await this.store.Beacons.findAll({
            where: { beaconAddr },
        });
        if (res && res.length){
            console.log("This should work")
            return res[0].dataValues;
        }else{
            console.log("This didn't work")
            return null;
        }
    }
}

module.exports = BeaconAPI;
