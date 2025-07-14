interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<GraphQLResponse<T>> {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '/api/graphql';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('GraphQL fetch error:', error);
    return {
      errors: [
        { message: error instanceof Error ? error.message : 'Unknown error' },
      ],
    };
  }
}
