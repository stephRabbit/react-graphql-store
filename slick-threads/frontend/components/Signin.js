import { Component } from 'react'
import { Mutation } from 'react-apollo'

import { SIGNIN_MUTATION } from '../gql/mutation'
import { CURRENT_USER_QUERY } from '../gql/query'
import ErrorMessage from './ErrorMessage'
import Form from './styles/Form'

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = e => {
    //e.persist()
    const { name, value } = e.target
    this.setState(() => ({ [name]: value }))
  }

  onSubmit = fn => async e => {
    e.preventDefault()
    await fn()
    this.setState(() => ({
      email: '',
      password: '',
    }))
  }

  render() {
    const { email, password } = this.state
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <Form method="post" onSubmit={this.onSubmit(signin)}>
              <ErrorMessage error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In!</h2>
                <label htmlFor="email">
                  Email
                  <input
                    name="email"
                    onChange={this.saveToState}
                    placeholder="Email"
                    required
                    type="email"
                    value={email}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    name="password"
                    onChange={this.saveToState}
                    placeholder="Password"
                    required
                    type="password"
                    value={password}
                  />
                </label>
                <button type="submit">Sign In!</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default Signin
