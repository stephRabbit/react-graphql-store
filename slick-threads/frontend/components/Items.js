import { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { ALL_ITEMS_QUERY } from '../gql/query'

import Item from './Item'
import Pagination from './Pagination'
import { perPage } from '../config';

const Center = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
`

export default class Items extends Component {
  render() {
    const { page } = this.props
    return (
      <Center>
        <Pagination page={page} />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: page * perPage - perPage, // 1 skip 4 - 4
          }}
        >
          {({ data, error, loading, }) => {
            if (error) return <p>error</p>
            if (loading || !data) return <p>Loading...</p>

            return (
              <ItemsList>
                {
                  data.items.map(item => <Item key={item.id} item={item} />)
                }
              </ItemsList>
            )
          }}
        </Query>
        <Pagination page={page} />
      </Center>
    )
  }
}

