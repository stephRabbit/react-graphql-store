import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import Router from 'next/router'

import { SINGLE_ITEM_QUERY } from '../gql/query'
import { UPDATE_ITEM_MUTATION } from '../gql/mutation'
import formatMoney from '../lib/formatMoney'
import Form from './styles/Form'
import ErrorMessage from '../components/ErrorMessage'

class UpdateItem extends Component {
  state = {}

  handleChange = e => {
    //e.persist()
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState(() => ({ [name]: val }))
  }

  onSubmit = fn => async e => {
    e.preventDefault()
    const res = await fn({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    })
    // // Redirect to single item page
    // Router.push({
    //   pathname: '/item',
    //   query: { id: res.data.createItem.id }
    // })
  }

  render() {
    const { description, price, title } = this.state
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{ id: this.props.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>
          if (!data.item) return <p>Sorry, No Item Found for ID "{this.props.id}"!</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, { error, loading }) => (
                <Form onSubmit={this.onSubmit(updateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        name="title"
                        onChange={this.handleChange}
                        placeholder="Title"
                        required
                        type="text"
                        defaultValue={data.item.title}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        name="price"
                        onChange={this.handleChange}
                        min="0"
                        placeholder="Price"
                        required
                        type="number"
                        defaultValue={data.item.price}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        name="description"
                        onChange={this.handleChange}
                        placeholder="Enter a description"
                        required
                        defaultValue={data.item.description}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? 'ing' : 'e'} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem