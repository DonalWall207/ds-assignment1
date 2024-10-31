import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = createDDbDocClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // Print Event
  console.log("[EVENT]", JSON.stringify(event));
  
  // Extract movieId from path parameters
  const movieId = event.pathParameters?.movieId;

  // Check for missing movieId
  if (!movieId) {
    return {
      statusCode: 400,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ message: "Missing movieId in path parameters" }),
    };
  }

  try {
    // Prepare the DeleteCommand
    const command = new DeleteCommand({
      TableName: process.env.TABLE_NAME, // DynamoDB table name from environment
      Key: { movieId }, // Primary key for the movie to be deleted
    });

    // Execute the delete command
    await ddbDocClient.send(command);

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ message: `Movie with ID ${movieId} deleted successfully.` }),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[ERROR] Deleting movie with ID ${movieId}:`, error);
      return {
        statusCode: 500,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ error: error.message }),
      };
    } else {
      console.error(`[ERROR] Deleting movie with ID ${movieId}:`, error);
      return {
        statusCode: 500,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }
  }
};

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