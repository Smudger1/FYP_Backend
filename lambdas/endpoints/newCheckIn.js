const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const CheckInBeaconTable = process.env.CheckInBeaconTable;

exports.handler = async event => {
    console.log('event', event)

    if (!event.body) {
        // Failed without id
        return Responses._400({message: 'Missing Data'});
    }
    const body = JSON.parse(event.body);

    const beaconList = body.beacons;
    let confirmedList = [];

    for (let beaconListKey in beaconList) {
        let beaconKey = "B#"+beaconList[beaconListKey];
        const currentBeacon = await Dynamo.get(beaconKey, CheckInBeaconTable).catch(err => {
            console.log("Error in dynamo get", err);
            return null;
        });

        if (currentBeacon){
            confirmedList.push(currentBeacon.Item);
        }
    }

    if (confirmedList.length === 0){
        return Responses._400({message: 'No valid beacons found.'})
    }

    return Responses._200({confirmedList});
}
