const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'us-east-1' });

const params = {
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/211125446878/my-queue',
  MessageBody: 'Hello from SQS!',
};

sqs.sendMessage(params, (err, data) => {
  if (err) {
    console.error('Error sending message', err);
  } else {
    console.log('Message sent successfully', data.MessageId);
  }
});
