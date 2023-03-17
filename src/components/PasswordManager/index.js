import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const instantPasswordList = []

class PasswordManager extends Component {
  state = {
    isShowPassword: false,
    passwordList: instantPasswordList,
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  onAddPasswordItem = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPasswordItem = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordItem],
    }))
    this.setState({website: '', username: '', password: ''})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  addInputPassword = () => {
    const {website, username, password} = this.state

    return (
      <form
        className="input-elements-container"
        onSubmit={this.onAddPasswordItem}
      >
        <h1 className="add-password-text">Add New Password</h1>
        <div className="input-container">
          <img
            className="input-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
          />
          <input
            value={website}
            onChange={this.onChangeWebsite}
            className="input"
            type="text"
            placeholder="Enter Website"
          />
        </div>
        <div className="input-container">
          <img
            className="input-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
          />
          <input
            value={username}
            onChange={this.onChangeUsername}
            className="input"
            type="text"
            placeholder="Enter Username"
          />
        </div>
        <div className="input-container">
          <img
            className="input-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
          />
          <input
            value={password}
            onChange={this.onChangePassword}
            className="input"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="button">
          Add
        </button>
      </form>
    )
  }

  onRemovePassword = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(eachItem => id !== eachItem.id)
    this.setState({passwordList: filteredList})
  }

  onSearchPassword = event => {
    const {passwordList, searchInput} = this.state
    this.setState({searchInput: event.target.value})
    const filteredList = passwordList.filter(eachItem =>
      eachItem.website.includes(searchInput),
    )

    this.setState({passwordList: filteredList})
  }

  onShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  navBar = () => {
    const {passwordList} = this.state
    const count = passwordList.length

    return (
      <div className="nav-container">
        <div className="password-counter">
          <h1 className="counter-text">Your Passwords</h1>
          <p className="counter">{count}</p>
        </div>
        <div className="input-container">
          <img
            className="input-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
          />
          <input
            onChange={this.onSearchPassword}
            className="input"
            type="search"
            placeholder="Search"
          />
        </div>
      </div>
    )
  }

  render() {
    const {passwordList, isShowPassword} = this.state

    return (
      <div className="password-manager-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="add-password-container">
          {this.addInputPassword()}
          <img
            className="password-manager-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
        </div>
        <div className="bottom-container">
          {this.navBar()}
          <hr className="hr-line" />
          <div className="label-container">
            <label className="label" id="toggleInput">
              <input
                className="radio-button"
                type="checkbox"
                htmlFor="toggleInput"
                onClick={this.onShowPassword}
              />
              Show Passwords
            </label>
          </div>
          {passwordList.length > 0 ? (
            <ul className="password-container">
              {passwordList.map(eachItem => (
                <PasswordItem
                  isShowPassword={isShowPassword}
                  onRemovePassword={this.onRemovePassword}
                  key={eachItem.id}
                  passwordDetails={eachItem}
                />
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="password-manager-image"
                alt="no passwords"
              />
              <p className="counter-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
