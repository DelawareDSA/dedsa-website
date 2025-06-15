import { fetchGraphQL } from './fetcher';

export async function getAllPostSlugs() {
  const query = `
    query GetAllPostSlugs {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  const response = await fetchGraphQL<{
    posts: { nodes: Array<{ slug: string }> };
  }>(query);
  return response.data?.posts?.nodes || [];
}

export const queryGraphQL = async <T>(
  query: string,
  variables?: Record<string, unknown>
) => {
  const response = await fetchGraphQL<T>(query, variables);

  return {
    data: response.data || ({} as T),
    error: response.errors ? new Error(response.errors[0]?.message) : undefined,
  };
};
