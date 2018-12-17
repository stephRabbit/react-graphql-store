import { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Head from 'next/head'

import { SINGLE_ITEM_QUERY } from '../gql/query'
import ErrorMessage from '../components/ErrorMessage'

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem 0;
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    font-size: 2rem;
    margin: 3rem;
  }
`

class SingleItem extends Component {
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, error, loading, }) => {
          <ErrorMessage error={error} />
          if (loading) return <p>Loading...</p>
          if (!data.item) return <p>Sorry, No Item Found for ID "{this.props.id}"!</p>
          console.log(data)
          const { item } = data
          return (
            <SingleItemStyles>
              {/* Meta title update next.js */}
              <Head>
                <title>Slick Threads | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.title} />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          )
        }}
      </Query>
    )
  }
}

export default SingleItem