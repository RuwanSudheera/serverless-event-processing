const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

//S3 event 
module.exports.processS3Event = async (event) => {
  console.log('S3 Event:', JSON.stringify(event, null, 2));
  const records = event.Records.map(record => {
    const transformedData = {
      ID: record.s3.object.key,
      data: record.s3.object.size 
    };
    return transformedData;
  });

  for (const record of records) {
    await dynamoDB.put({
      TableName: 'TransformedData',
      Item: record
    }).promise();
  }

  return { status: 'done' };
};

//SQS event
module.exports.processSQSEvent = async (event) => {
  console.log('SQS Event:', JSON.stringify(event, null, 2));
  const records = event.Records.map(record => {
    const body = JSON.parse(record.body);
    const transformedData = {
      ID: record.messageId,
      data: body 
    };
    return transformedData;
  });

  for (const record of records) {
    await dynamoDB.put({
      TableName: 'TransformedData',
      Item: record
    }).promise();
  }

  return { status: 'done' };
};
