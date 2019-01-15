import Link from 'next/link'

import User from './User'
import Signout from './Signout'
import NavStyles from './styles/NavStyles';

const Nav = () => {
  return (
      <User>
        {({ data: { me = null } }) => (
          <NavStyles>
            <Link href="/items">
              <a>Shop</a>
            </Link>
            {me && (
              <>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Account</a>
                </Link>
                <Signout />
              </>
            )}
            {!me && (
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
            )}
          </NavStyles>
        )}
      </User>
  )
}

export default Nav