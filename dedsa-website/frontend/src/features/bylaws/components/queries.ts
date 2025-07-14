import { gql } from '@apollo/client';

export const GET_BYLAWS_PAGE = gql`
  query GetBylawsPage {
    page(id: "bylaws", idType: URI) {
      content
      bylaws {
        pdfUrl
        lastUpdated
      }
    }
  }
`;
