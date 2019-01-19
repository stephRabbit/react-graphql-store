import ResetPage from '../components/Reset'

const Reset = ({ query }) => {
  return (
    <div>
      <ResetPage resetToken={query.resetToken} />
    </div>
  )
}

export default Reset