import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withData from '../lib/withData'
import Page from '../components/Page'

class AppContainer extends App {
  // Next.js lifecyle - runs before first render
  // exposes return {} as props
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    // For every page crawl for queries or mutations inside
    // the page that need to be fetched
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Expose the query to user
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {
    const { apollo, Component, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(AppContainer)