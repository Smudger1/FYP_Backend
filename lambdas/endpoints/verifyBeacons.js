const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const CheckInBeaconTable = process.env.CheckInBeaconTable;

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
    let confirmedList = [];

    // Sample Data - for testing
    confirmedList.push({"ID": "B#DC:A6:32:86:F2:B6", "VenueID": "7cc42c86-1c29-447c-99f5-0f9953e3668a", "VenueName": "One Eyed Dog"});

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
