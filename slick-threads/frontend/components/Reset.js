import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { PropTypes } from 'prop-types'

import { RESET_PASSWORD_MUTATION } from '../gql/mutation'
import { CURRENT_USER_QUERY } from '../gql/query'

import ErrorMessage from './ErrorMessage'
import Form from './styles/Form'

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }

  state = {
    password: '',
    confirmPassword: '',
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
      password: '',
      confirmPassword: '',
    }))
  }

  render() {
    const { password, confirmPassword } = this.state
    const { resetToken } = this.props
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          password,
          confirmPassword,
          resetToken,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { error, loading }) => {
          return (
            <Form method="post" onSubmit={this.onSubmit(resetPassword)}>
              <ErrorMessage error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
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
                <label htmlFor="confirmPassword">
                  Confirm Password
                  <input
                    name="confirmPassword"
                    onChange={this.saveToState}
                    placeholder="Password"
                    required
                    type="password"
                    value={confirmPassword}
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

export default Reset
