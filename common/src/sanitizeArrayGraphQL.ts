import sanitizeHtml from 'sanitize-html'
import { ApiGraphQLError, ERROR_CODES } from './index'


/**Returns graphQLError */
export function sanitizeArrayGraphQL(input: unknown): string | string[] {
  const clean = (str: string) => sanitizeHtml(str.trim(), {
    allowedTags: [],
    allowedAttributes: {},
    allowedSchemes: [],
  })

  if (typeof input === 'string') {
    return clean(input)
  } 
  
  if (Array.isArray(input) && input.every(item => typeof item === 'string')) {
    const sanitizedArray = input
      .map(item => clean(item))
      .filter(item => item.length > 0)

    return sanitizedArray
  }

  throw new ApiGraphQLError(400, 'Invalid bullet list symbols', {
    code: ERROR_CODES.BAD_USER_INPUT
  })
}
