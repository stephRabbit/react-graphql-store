import { Query } from 'react-apollo'
import Head from 'next/head'
import Link from 'next/link'

import { PAGINATION_QUERY } from '../gql/query'
import { perPage } from '../config'
import PaginationStyles from './styles/PaginationStyles'


const Pagination = ({ page }) => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>
        const { count } = data.itemsConnection.aggregate
        const pages = Math.ceil(count / perPage)
        return (
          <PaginationStyles>
            <Head>
              <title>
                Slick Threads - {page} of {pages}
              </title>
            </Head>
            <Link
              href={{
                pathname: '/items',
                query: { page: page -1 }
              }}
              prefetch
            >
              <a className="prev" aria-disabled={page <= 1}>← Prev</a>
            </Link>
            <p>Page {page} of {pages}</p>
            <p>{count} Items</p>
            <Link
              href={{
                pathname: '/items',
                query: { page: page +1 }
              }}
              prefetch
            >
              <a className="next" aria-disabled={page >= pages}>Next →</a>
            </Link>
          </PaginationStyles>
        )
      }}
    </Query>
  )
}

export default Pagination