import { gql } from 'apollo-boost'

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      image
      largeImage
      price
    }
  }
`