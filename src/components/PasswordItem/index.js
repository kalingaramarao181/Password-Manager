import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onRemovePassword, isShowPassword} = props
  const {id, password, website, username} = passwordDetails

  const showPassword = isShowPassword ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )
  const profileLogo = website[0]

  const onDeletePassword = () => {
    onRemovePassword(id)
  }

  return (
    <li className="list-item">
      <p className="p-logo">{profileLogo}</p>
      <div className="items-container">
        <p className="text">{website}</p>
        <p className="text">{username}</p>
        <p className="text">{showPassword}</p>
      </div>
      <button
        data-testid="delete"
        onClick={onDeletePassword}
        type="button"
        className="delete-button"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
