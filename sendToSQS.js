const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' }); 
const sqs = new AWS.SQS();

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/211125446878/MyQueue';

const sendMessageToSQS = async (messageBody) => {
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: queueUrl
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log('Message sent to SQS:', result.MessageId);
  } catch (error) {
    console.error('Error sending message to SQS:', error);
  }
};

// Testing message body
const messageBody = {
  orderId: '12345',
  customerId: '67890',
  items: [
    { productId: 'abc', price: 10.99, quantity: 2 },
    { productId: 'def', price: 5.49, quantity: 4 }
  ]
};

// Send the message
sendMessageToSQS(messageBody);
