import { Component } from 'react'
import { Mutation } from 'react-apollo'

import { SIGNUP_MUTATION } from '../gql/mutation'
import ErrorMessage from './ErrorMessage'
import Form from './styles/Form'

class Signup extends Component {
  state = {
    email: '',
    name: '',
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
      name: '',
      password: '',
    }))
  }

  render() {
    const { email, name, password } = this.state
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
      >
        {(signup, { error, loading }) => {
          return (
            <Form method="post" onSubmit={this.onSubmit(signup)}>
              <ErrorMessage error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up for an account!</h2>
                <label htmlFor="name">
                  Name
                  <input
                    name="name"
                    onChange={this.saveToState}
                    placeholder="Name"
                    required
                    type="text"
                    value={name}
                  />
                </label>
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
                <button type="submit">Sign Up!</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default Signup
