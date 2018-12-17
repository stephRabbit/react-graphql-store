import UpdateItem from '../components/UpdateItem'

const Update = ({ query }) => {
  return (
    <div>
      {/* {pageProps.query = ctx.query - _app.js} */}
      <UpdateItem id={query.id} />
    </div>
  )
}

export default Update