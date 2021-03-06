const Sequelize = require('sequelize');

module.exports.createStore = () => {
    const Op = Sequelize.Op;
    const operatorsAliases = {
        $in: Op.in,
    };

    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './store.sqlite',
        operatorsAliases,
        define: {
            timestamps: false,
        },
        logging: false,
    });

    db
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const Venues = db.define('venue', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        venueName: Sequelize.STRING,
        venueAddr1: Sequelize.STRING,
        venueAddr2: Sequelize.STRING,
        venuePostcode: Sequelize.STRING,
        venueOpen: Sequelize.STRING,
        venueClose: Sequelize.STRING
    });

    const Beacons = db.define('beacon', {
        beaconAddr: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        venueId: Sequelize.STRING,
    });

    const CheckIns = db.define('check_in', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        beaconAddr: Sequelize.STRING,
        user: Sequelize.STRING,
        dateIn: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        dateOut: Sequelize.DATE,
    });

    Venues.sync({}).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return null;
    });

    Beacons.sync({}).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return null;
    });

    CheckIns.sync({}).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return null;
    });

    return {
        Beacons,
        Venues,
        CheckIns
    };
};
