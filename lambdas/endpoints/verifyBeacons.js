const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const beaconsTable = process.env.beaconsTable;

exports.handler = async event => {
    console.log('event', event)

    if (!event.body) {
        // Failed without id
        return Responses._400({message: 'Missing list of beacons'});
    }
    const body = JSON.parse(event.body)
    if (!body.beacons){
        return Responses._400({message: 'Missing list of beacons'});
    }

    const beaconList = body.beacons;
    let confirmedList = {};

    for (const beaconListKey in beaconList) {
        const currentBeacon = await Dynamo.get('BeaconAddr', beaconListKey, beaconsTable).catch(err => {
            console.log("Error in dynamo get", err);
            return null;
        });

        return Responses._400(currentBeacon)

        if (currentBeacon){
            confirmedList.append(currentBeacon);
        }
    }

    if (confirmedList.length === 0){
        return Responses._400({message: 'No valid beacons found.'})
    }

    return Responses._200({confirmedList});
}
