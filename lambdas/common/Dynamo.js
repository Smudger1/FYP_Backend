const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(GivenKey, ID, TableName){
        const params = {
            TableName,
            Key:{
                //"VenueID": "906eaf8c-330c-41b9-969f-efe99b6477b2"
                "BeaconAddr": "DC:A6:32:86:F2:B2"
            }
        };

        const data = await documentClient
            .get(params)
            .promise()

        if (!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }
        console.log(data);

        return data;
    },

    async write(data, TableName){
        if (!data.ID){
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`)
        }

        return data;
    }

};

module.exports = Dynamo;
