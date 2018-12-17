import { Component } from 'react'
import { Mutation } from 'react-apollo'

import { DELETE_ITEM_MUTATION } from '../gql/mutation'
import { ALL_ITEMS_QUERY } from '../gql/query'

class DeleteItem extends Component {
  confirmDelete = fn => () => {
    if (confirm('Are you sure you want to delete this item')) {
      fn()
    }
  }

  updateCache = (cache, payload) => {
    // Manunally update cache on client to match server
    // Read cache for the items
    const data = cache.readQuery({
      query: ALL_ITEMS_QUERY,
    })

    // Fitler deleted items from page
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)

    // Put items back
    cache.writeQuery({
      query: ALL_ITEMS_QUERY,
      data,
    })
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{
          id: this.props.id
        }}
        update={this.updateCache}
      >
        {(deleteItem, { error }) => (
          <button onClick={this.confirmDelete(deleteItem)}>{this.props.children}</button>
        )}
      </Mutation>
    )
  }
}

export default DeleteItem
