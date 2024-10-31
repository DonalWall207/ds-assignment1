import { marshall } from "@aws-sdk/util-dynamodb";
import { Movie } from "./types";

// Remove MovieCast from Entity type
type Entity = Movie;  
export const generateItem = (entity: Entity) => {
  return {
    PutRequest: {
      Item: marshall(entity),
    },
  };
};

export const generateBatch = (data: Entity[]) => {
  return data.map((e) => {
    return generateItem(e);
  });
};
