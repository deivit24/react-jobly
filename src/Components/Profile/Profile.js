import React, { useState, useContext, useEffect, useRef } from 'react';
import API from '../../API';
import UserContext from '../../Helpers/UserContext';
import Message from '../../Helpers/useMessage';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const MESSAGE_SHOW_PERIOD_IN_MSEC = 3000;

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    first_name: currentUser.first_name || '',
    last_name: currentUser.last_name || '',
    email: currentUser.email || '',
    photo_url: currentUser.photo_url || '',
    username: currentUser.username,
    password: '',
    errors: [],
    saveConfirmed: false,
  });

  const messageShownRef = useRef(false);
  useEffect(() => {
    if (userForm.saveConfirmed && !messageShownRef.current) {
      messageShownRef.current = true;
      setTimeout(() => {
        setUserForm((f) => ({ ...f, saveConfirmed: false }));
        messageShownRef.current = false;
      }, MESSAGE_SHOW_PERIOD_IN_MSEC);
    }
  }, [userForm]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      let profileData = {
        first_name: userForm.first_name || undefined,
        last_name: userForm.last_name || undefined,
        email: userForm.email || undefined,
        photo_url: userForm.photo_url || undefined,
        password: userForm.password,
      };

      let username = userForm.username;
      let updatedUser = await API.saveProfile(username, profileData);

      console.log('UPDATED USER', updatedUser);
      setUserForm((f) => ({
        ...f,
        errors: [],
        saveConfirmed: true,
        password: '',
      }));
      setCurrentUser(updatedUser);
    } catch (errors) {
      setUserForm((f) => ({ ...f, errors }));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((f) => ({
      ...f,
      [name]: value,
      errors: [],
    }));
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4">
          <Card>
            <CardImg
              top
              width="100%"
              src={userForm.photo_url}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                {userForm.first_name} {userForm.last_name}
                <br />
                <small className="text=muted">@{userForm.username}</small>
              </CardTitle>
              <CardText>{userForm.email}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-8">
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="first_name"
                className="form-control"
                value={userForm.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="last_name"
                className="form-control"
                value={userForm.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={userForm.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Photo URL</label>
              <input
                name="photo_url"
                className="form-control"
                value={userForm.photo_url}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={userForm.password}
                onChange={handleChange}
              />
            </div>

            {userForm.errors.length ? (
              <Message type="danger" message={userForm.errors} />
            ) : null}

            {userForm.saveConfirmed ? (
              <Message type="success" message="User updated successfully." />
            ) : null}

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
