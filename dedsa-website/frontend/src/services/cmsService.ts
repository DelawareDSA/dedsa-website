import { GraphQLClient } from 'graphql-request'

const endpoint = '/api/graphql';
export const cmsClient = new GraphQLClient(endpoint)

export async function fetchEvents() {
  const query = `{
    events {
      nodes {
        title
      }
    }
  }`
  return cmsClient.request(query)
}
