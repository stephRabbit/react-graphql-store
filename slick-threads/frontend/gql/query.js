import { gql } from 'apollo-boost'
import { perPage } from '../config'

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY(
    $skip: Int = 0,
    $first: Int = ${perPage}
  ) {
    items(
      skip: $skip,
      first: $first,
      orderBy: createdAt_DESC
    ) {
      id
      title
      description
      image
      largeImage
      price
    }
  }
`
export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`