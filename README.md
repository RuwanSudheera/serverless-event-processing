# Serverless Event Processing System  (IOT - Assignment)

## Introduction
This application is a serverless event processing system built using AWS services and the Serverless Framework. It processes events from AWS S3 / AWS SQS, transforms the data, and stores the results in Amazon DynamoDB.

## Architecture Diagram
![Architecture Diagram](https://lucid.app/lucidspark/17acde74-431e-46f0-bada-cd2748b77d9b/edit?viewport_loc=-254%2C-264%2C3003%2C1699%2C0_0&invitationId=inv_ca41e3d9-357a-4f48-822d-059816fade47)

### Architecture Explanation
1. **AWS S3**: Triggers a Lambda function on new file uploads.
2. **AWS SQS**: Triggers a Lambda function on new messages in the queue.
3. **AWS Lambda**: Processes and transforms data from S3 and SQS events.
4. **Amazon DynamoDB**: Stores transformed data.
5. **AWS CloudWatch**: Logs and monitors the system.
6. **IAM Roles and Policies**: Secures access to AWS resources.

## Deployment Instructions
1. **Clone the repository**:
    ```bash
    git clone https://github.com/RuwanSudheera/serverless-event-processing.git
    cd serverless-event-processing
    ```

2. **Install Serverless Framework**:
    ```bash
    npm install -g serverless
    ```
    **Install Other dependencies**:
    ```bash
    npm install
    ```

3. **Deploy the application**:
    ```bash
    serverless deploy
    ```

4. **Set up S3 bucket and SQS queue** as specified in `serverless.yml`.

## Usage Instructions
1. **Generate S3 Events**: Upload files to the specified S3 bucket to trigger the `processS3Event` Lambda function.
2. **Generate SQS Events**: Send messages to the specified SQS queue to trigger the `processSQSEvent` Lambda function. This can simulate by runing sqs-test script.
3. **Verify Processed Data**: Check the DynamoDB table `TransformedData` to see the transformed data.

## Reflection
### Challenges Faced | Lessons Learned | Potential Improvements
- Configuring IAM roles to ensure least privilege while allowing necessary access.
- Handling different event structures from S3 and SQS in Lambda functions.
- Ensure processing events to avoid duplicates in DynamoDB.
 
- Deepened understanding of AWS services integration using the Serverless Framework.
- Gained experience in writing transformation logic and handling different data structures.
- Learned to monitor and debug serverless applications effectively using CloudWatch.

- Implement more complex transformation logic with additional event sources.
- Enhance error handling and implement retry mechanisms for Lambda functions.

