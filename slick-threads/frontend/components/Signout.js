import { Mutation } from 'react-apollo'

import { SIGNOUT_MUTATION } from '../gql/mutation'
import { CURRENT_USER_QUERY } from '../gql/query'

const Signout = props => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => {
      return <button onClick={signout}>Signout</button>
    }}
  </Mutation>
)

export default Signout
