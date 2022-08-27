/**
 * Get provider endpoint if available
 * @param {string} url
 * @param {import('../@types/OembedProvider').OembedProvider[]} providers
 */
export const getProviderEndpoint = (url, providers) => {
  let transformedEndpoint = undefined

  for (const provider of providers || []) {
    for (const endpoint of provider.endpoints || []) {
      for (let schema of endpoint.schemes || []) {
        if (transformedEndpoint === undefined) {
          schema = schema.replace('*', '.*')
          const regExp = new RegExp(schema)
          const isMatchingSchema = regExp.test(url)

          if (isMatchingSchema) {
            transformedEndpoint = endpoint.url
          }
        }
      }
    }
  }

  return transformedEndpoint
}
