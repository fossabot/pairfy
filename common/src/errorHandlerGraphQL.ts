import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { ERROR_CODES } from "./index";



export class ApiGraphQLError extends GraphQLError {
  public statusCode: number;
  public code: string;

  constructor(
    statusCode: number,
    message: string,
    options: {
      code?: string;
      details?: unknown; 
      path?: readonly (string | number)[];
    } = {}
  ) {
    const code = options.code ?? ERROR_CODES.INTERNAL_ERROR;

    super(message, {
      extensions: {
        code,
        status: statusCode || 500,
        ...(code === ERROR_CODES.VALIDATION_ERROR && options.details
          ? { details: options.details }
          : {}),
      },
      path: options.path,
    });

    this.code = code;
    this.statusCode = statusCode || 500;
  }
}

export const normalizeGraphError = (err: unknown): ApiGraphQLError => {
  if (err instanceof ApiGraphQLError) return err;

  if (err instanceof ZodError) {
    return new ApiGraphQLError(400, "Validation error", {
      code: ERROR_CODES.VALIDATION_ERROR,
      details: err.flatten(),
    });
  }

  if (err instanceof GraphQLError) {
    return new ApiGraphQLError((err.extensions.status as number) || 500, err.message, {
      code: (err.extensions.code as string) || ERROR_CODES.INTERNAL_ERROR,
      path: err.path,
    });
  }

  if (err instanceof Error) {
    return new ApiGraphQLError(500, "Internal server error", {
      code: ERROR_CODES.INTERNAL_ERROR
    });
  }

  return new ApiGraphQLError(500, "Unknown internal error", {
    code: ERROR_CODES.INTERNAL_ERROR
  });
};

export const throwGraphQLError = (
  statusCode: number,
  message: string,
  options?: { code?: string; statusCode?: number; details?: unknown }
): never => {
  throw new ApiGraphQLError(statusCode, message, options);
};
