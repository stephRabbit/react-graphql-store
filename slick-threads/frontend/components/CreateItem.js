import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Router from 'next/router'

import { CREATE_ITEM_MUTATION } from '../gql/mutation'
import formatMoney from '../lib/formatMoney'
import Form from './styles/Form'
import ErrorMessage from '../components/ErrorMessage'

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }

  handleChange = e => {
    //e.persist()
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState(() => ({ [name]: val }))
  }

  uploadFile = async e => {
    console.log('uploading')
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'slickthreads')
    const res = await fetch('https://api.cloudinary.com/v1_1/deh8c4opq/image/upload/', {
      method: 'POST',
      body: data,
    })
    const file = await res.json()
    console.log(file.secure_url)
    console.log(file.eager[0].secure_url)
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    })
  }

  onSubmit = fn => async e => {
    e.preventDefault()
    const res = await fn()
    // Redirect to single item page
    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id }
    })
  }

  render() {
    const { description, image, price, title } = this.state
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { error, loading, called, data }) => (
          <Form onSubmit={this.onSubmit(createItem)}>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  name="file"
                  onChange={this.uploadFile}
                  placeholder="Upload an image"
                  required
                  type="file"
                />
                {image && (
                  <img
                    alt="Upload preview"
                    src={image}
                    width="100"
                  />
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  name="title"
                  onChange={this.handleChange}
                  placeholder="Title"
                  required
                  type="text"
                  value={title}
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
                  value={price}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  name="description"
                  onChange={this.handleChange}
                  placeholder="Enter a description"
                  required
                  value={description}
                />
              </label>
              <button type="submit">
                Submit
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem