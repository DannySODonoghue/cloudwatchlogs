//import AWS from 'aws-sdk';
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'xxxxxxxxxxxxxxxx',
    secretAccessKey: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
    region: 'us-east-2', // Replace with your desired region
  });

const sampleInput = {
    title: "hello",
    body: "world",
    criteria: "criteria"
}

exports.handler = async (event) => {
    let result;
    const cloudwatchlogs = new AWS.CloudWatchLogs();
    const CRITERIA = "criteria";
    const sourceLogGroupName = "/aws/lambda/LoggingTest";

    let destinationLogGroup;
    let logstreamname;
    if (sampleInput.criteria === CRITERIA) {
        destinationLogGroup = "TestLogGroup";
        logstreamname = 'test-log-stream';
    } else {
        destinationLogGroup === "AllLogGroup";
        logstreamname = 'all-log-stream';
    }

    const params = {
        logGroupName: destinationLogGroup,
        logStreamName: logstreamname,
        logEvents: [
            /*{
                message: JSON.stringify(sampleInput),
                timestamp: new Date().getTime()
            }, */
            sampleInput
        ]
    };

    try {
        await cloudwatchlogs.putLogEvents(params).promise();

        console.log(`Log routed to ${destinationLogGroup}`);
        result = `Log routed to ${destinationLogGroup}`;
    } catch (error) {
        console.error(error);
    }

    //console.log(CloudWatchLogs.VERSION);

    // implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };
    return response;
};
