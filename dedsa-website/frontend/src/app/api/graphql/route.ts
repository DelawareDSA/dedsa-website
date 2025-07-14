import { NextRequest, NextResponse } from 'next/server';
import { handleGraphQLRequest } from '@/mocks/api/mockApiHandlers';

const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (useMockApi) {
      console.log('Using mock API data for GraphQL request');
      const mockResponse = await handleGraphQLRequest(body);
      return NextResponse.json(mockResponse);
    }

    const wpEndpoint =
      process.env.WORDPRESS_API_URL ||
      'http://delaware-dsa-backend.local/graphql';

    console.log(`Forwarding GraphQL request to: ${wpEndpoint}`);

    const response = await fetch(wpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `WordPress API responded with status: ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GraphQL API route error:', error);

    if (useMockApi) {
      try {
        const mockResponse = await handleGraphQLRequest({
          operationName: 'FallbackMock',
          query: '',
          variables: {},
        });
        return NextResponse.json(mockResponse);
      } catch (mockError) {
        console.error('Even mock data generation failed:', mockError);
      }
    }

    return NextResponse.json(
      {
        errors: [
          {
            message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
      },
      { status: 500 }
    );
  }
}
