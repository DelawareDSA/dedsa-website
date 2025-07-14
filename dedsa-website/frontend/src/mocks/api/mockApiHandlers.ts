interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
  operationName?: string;
}

interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function handleGraphQLRequest(
  request: GraphQLRequest
): Promise<GraphQLResponse> {
  console.log('Mock GraphQL request:', request);

  if (
    request.query.includes('posts') ||
    request.query.includes('GetAllPostSlugs')
  ) {
    return {
      data: {
        posts: {
          nodes: [
            {
              id: 'mock-post-1',
              title: 'Mock Post 1',
              slug: 'mock-post-1',
              excerpt: 'This is a mock post excerpt.',
              content: '<p>This is mock content for development.</p>',
              date: new Date().toISOString(),
            },
          ],
        },
      },
    };
  }

  return {
    data: {
      mock: true,
      message:
        'This is a mock response. Implement specific mock data as needed.',
    },
  };
}
