# Serverless Event Processing System  (IOT - Assignment)

## Introduction
This application is a serverless event processing system built using AWS services and the Serverless Framework. It processes events from AWS S3 / AWS SQS, transforms the data, and stores the results in Amazon DynamoDB.

## Architecture Diagram
https://drive.google.com/file/d/1sEAWJZ12_nxGFHolu1kY_h53UTcPLn15/view

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
1. **Generate S3 Events**: Upload a json file with {name:"", email:""} data to the specified S3 bucket to trigger the `s3Handler` Lambda function.
2. **Generate SQS Events**: Send messages to the specified SQS queue to trigger the `sqsHandler` Lambda function. This can simulate by runing "sendToSQS.js" script.
3. **Verify Processed Data**: Check the DynamoDB table `ProcessedDataTable` to see the transformed data.

## Reflection
### Challenges Faced | Lessons Learned | Potential Improvements
- Serverless architecture is a new experience of development. 
- Debug process is new experience with cloudwatch and had to adopt it. 
- Faced issue with deploy with issue called "too many open files" and had to solve that with plugins.
- Configuring IAM roles to ensure least privilege while allowing necessary access.
- Handling different event structures from S3 and SQS in Lambda functions.
- Ensure processing events to avoid duplicates in DynamoDB.
 
- Deepened understanding of AWS services integration using the Serverless Framework.
- Gained experience in writing transformation logic and handling different data structures.
- Learned to monitor and debug serverless applications effectively using CloudWatch.

- Implement more complex transformation logic with additional event sources.

