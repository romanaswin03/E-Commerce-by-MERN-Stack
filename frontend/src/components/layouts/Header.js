import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownButton, Dropdown, Image } from 'react-bootstrap'
import { logOut } from '../../actions/userActions'

function Header() {
  const {isAuthenticate, user} = useSelector(state => state.authState);
  const {items:cartItems} = useSelector(state => state.cartState)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logOut)
  }

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand mx-4">
          <Link to={"/"}>

          <img width="80px" height="40px" alt="Shoppingcart Logo" src="/images/shoplogo.jpg" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        { isAuthenticate ? 
            (
              <Dropdown className='d-inline'>
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                      <figure className='avatar avatar-nav'>
                        <Image width="50px" src={user.avatar??'./images/default_avatar.png'}/>
                      </figure>
                      <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'>Orders</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler} className='text-danger'>LogOut</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            )
        :

        <Link to={'/login'} className="btn" id="login_btn">Login</Link>
        }
        <Link to={'/cart'}><span id="cart" className="ml-3">Cart</span></Link>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
  )
}

export default Header
