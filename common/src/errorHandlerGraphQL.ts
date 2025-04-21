import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { ERROR_CODES } from "./index";



export class ApiGraphQLError extends GraphQLError {
  public statusCode: number;
  public code: string;

  constructor(
    message: string,
    options: {
      code?: string;
      statusCode?: number;
      details?: unknown; 
      path?: readonly (string | number)[];
    } = {}
  ) {
    const code = options.code ?? ERROR_CODES.INTERNAL_ERROR;
    const statusCode = options.statusCode ?? 500;

    super(message, {
      extensions: {
        code,
        status: statusCode,
        ...(code === ERROR_CODES.VALIDATION_ERROR && options.details
          ? { details: options.details }
          : {}),
      },
      path: options.path,
    });

    this.code = code;
    this.statusCode = statusCode;
  }
}

export const normalizeGraphError = (err: unknown): ApiGraphQLError => {
  if (err instanceof ApiGraphQLError) return err;

  if (err instanceof ZodError) {
    return new ApiGraphQLError("Validation error", {
      code: ERROR_CODES.VALIDATION_ERROR,
      statusCode: 400,
      details: err.flatten(),
    });
  }

  if (err instanceof GraphQLError) {
    return new ApiGraphQLError(err.message, {
      code: (err.extensions.code as string) || ERROR_CODES.INTERNAL_ERROR,
      statusCode: (err.extensions.status as number) || 500,
      path: err.path,
    });
  }

  if (err instanceof Error) {
    return new ApiGraphQLError("Internal server error", {
      code: ERROR_CODES.INTERNAL_ERROR,
      statusCode: 500,
    });
  }

  return new ApiGraphQLError("Unknown internal error", {
    code: ERROR_CODES.INTERNAL_ERROR,
    statusCode: 500,
  });
};

export const throwGraphQLError = (
  message: string,
  options?: { code?: string; statusCode?: number; details?: unknown }
): never => {
  throw new ApiGraphQLError(message, options);
};
