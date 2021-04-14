const { RESTDataSource } = require('apollo-datasource-rest');

class CheckInAPI extends RESTDataSource {
    constructor({store}) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getCheckInByUser({ user }) {
        console.log(user)
        const res = await this.store.CheckIns.findAll({
            where: { user },
        });
        if (res && res.length){
            console.log("This should work")
            console.log(res)
            return res.map(l => l.dataValues).filter(l => !!l)
        }else{
            console.log("This didn't work")
            return [];
        }
    }

    async createNewCheckIn({ beaconAddr, user }) {
        const res = await this.store.CheckIns.create({ beaconAddr, user });
        return res._options.isNewRecord ;
    }

    async updateCheckOut({id}) {
        const res = await this.store.CheckIns.update(
            { dateOut: Date.now() },
            {
                where: { id },
            });

        return res[0];
    }
}

module.exports = CheckInAPI;
