import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = createDDbDocClient();
const translate = new AWS.Translate();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log("Event: ", event);

    const movieId = event?.pathParameters?.movieId;
    const language = event.queryStringParameters?.language;

    // Check for valid movieId
    if (!movieId) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Message: "Invalid movie Id" }),
      };
    }

    // Check for valid language parameter
    if (!language) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Message: "Invalid language entered" }),
      };
    }

    // Retrieve movie item from DynamoDB
    const reviewResponse = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: parseInt(movieId) },
      })
    );

    // Check if the movie exists
    if (!reviewResponse.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Movie not found'
        })
      };
    }

    // Log the retrieved item for debugging
    console.log("Retrieved Item: ", JSON.stringify(reviewResponse.Item));

    // Change this line to get the overview
    const text = reviewResponse.Item.overview;

    // Check if overview exists
    if (!text) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'No content available for translation',
        }),
      };
    }

    // Log the text to be translated
    console.log("Text to translate: ", text);

    // Prepare translation parameters
    const translateParams = {
      Text: text,
      SourceLanguageCode: 'en',
      TargetLanguageCode: language,
    };

    // Call the translation service
    const translatedMessage = await translate.translateText(translateParams).promise();

    // Return the translated message
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: translatedMessage,
      }),
    };

  } catch (error: any) {
    // Log any errors that occur during the process
    console.log(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ error }),
    };
  }
};

// Function to create a DynamoDB Document Client
function createDDbDocClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  };
  const unmarshallOptions = {
    wrapNumbers: false,
  };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}
