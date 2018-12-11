import { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { ALL_ITEMS_QUERY } from '../gql/query'

import Item from './Item'

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
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
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
      </Center>
    )
  }
}

