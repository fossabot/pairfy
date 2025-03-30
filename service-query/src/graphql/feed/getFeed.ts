import { redisClient } from "../../database/redis.js";
import { logger } from "../../utils/index.js";
import { GraphQLError } from 'graphql';

const getFeed = async () => {
  try {
    const result = await redisClient.client.get("feed:timeline");

    if (!result) {
        throw new GraphQLError("No timeline data available.", {
          extensions: { code: "FEED_TIMELINE_EMPTY" },
        });
      }

    return result;

  } catch (err) {
    logger.error(err);

    if (err instanceof GraphQLError) throw err;

    throw new GraphQLError("Internal server error", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
    
  }
};

export { getFeed };
