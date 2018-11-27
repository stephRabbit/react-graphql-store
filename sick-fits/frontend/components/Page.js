import { Component } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

import Header from '../components/Header'
import Meta from '../components/Meta'

const theme = {
  black: '#393939',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  breakLrg: '1300px',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  maxWidth: '1000px',
  offWhite: '#EDEDED',
  red: '#FF0000',
}

const StyledPage = styled.div`
  background-color: white;
  color: ${({ theme }) => theme.black};
`

const Inner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }

  a {
    text-decoration: none;
    color: ${theme.black};
  }

  button {  font-family: 'radnika_next'; }
`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page