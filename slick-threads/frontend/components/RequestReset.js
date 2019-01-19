import { Component } from 'react'
import { Mutation } from 'react-apollo'

import { REQUEST_RESET_MUTATION } from '../gql/mutation'

import ErrorMessage from './ErrorMessage'
import Form from './styles/Form'

class RequestReset extends Component {
  state = {
    email: '',
  }

  saveToState = e => {
    //e.persist()
    const { name, value } = e.target
    this.setState(() => ({ [name]: value }))
  }

  onSubmit = fn => async e => {
    e.preventDefault()
    await fn()
    this.setState(() => ({ email: '' }))
  }

  render() {
    const { email } = this.state
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
      >
        {(requestReset, { error, loading, called }) => {
          return (
            <Form method="post" onSubmit={this.onSubmit(requestReset)}>
              <ErrorMessage error={error} />
              {!error && !loading && called && (
                <p>Success! Check your email for a reset link.</p>
              )}
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request a password reset</h2>
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
                <button type="submit">Request Reset</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default RequestReset
