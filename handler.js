const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

//For s3 bucket event
module.exports.s3Handler = async (event) => {
  const record = event.Records[0];
  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

  // Get the file extension
  const fileExtension = key.split('.').pop().toLowerCase();

  if (fileExtension !== 'json') {
    console.log(`Skipping non-JSON file: ${key}`);
    return { status: 'skipped', reason: 'non-JSON file' };
  }

  try {
    // Get the file content from S3
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucket,
      Key: key
    };
    const data = await s3.getObject(params).promise();
    const fileContent = JSON.parse(data.Body.toString());
  
    // Transformation logic: Extract specific fields and add a timestamp
    const transformedData = {
      id: uuid.v4(),
      name: fileContent.name,
      email: fileContent.email,
      timestamp: new Date().toISOString(),
      source: 's3',
      bucket: bucket,
      key: key
    };
  
    // Store the transformed data in DynamoDB
    const dbParams = {
      TableName: 'ProcessedDataTable',
      Item: transformedData
    };
    await dynamoDb.put(dbParams).promise();
  
    return { status: 'success' };
  } catch (error) {
      console.error(`Error processing file ${key}:`, error);
      return { status: 'error', errorMessage: error.message };
  }
};


//For sqs event
module.exports.sqsHandler = async (event) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    // Transformation logic: Calculate total order value and add metadata
    const totalOrderValue = body.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const transformedData = {
      id: uuid.v4(),
      orderId: body.orderId,
      customerId: body.customerId,
      totalOrderValue: totalOrderValue,
      itemCount: body.items.length,
      processedAt: new Date().toISOString(),
      source: 'sqs',
      message: body
    };

    // Store the transformed data in DynamoDB
    const params = {
      TableName: 'ProcessedDataTable',
      Item: transformedData
    };
    await dynamoDb.put(params).promise();
  }
  return { status: 'success' };
};
