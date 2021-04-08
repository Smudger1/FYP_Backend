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
    let confirmedList = [];

    confirmedList.push({"BeaconAddr": "DC:A6:32:86:F2:B6", "VenueID": "243a885b-7b91-491d-a300-b499e2cd7847", "VenueName": "One Eyed Dog"});

    for (const beaconListKey in beaconList) {
        const currentBeacon = await Dynamo.get('BeaconAddr', beaconListKey, beaconsTable).catch(err => {
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
