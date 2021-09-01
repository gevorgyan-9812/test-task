import React, { useEffect, useRef, useState } from 'react'
import jwt_decode from 'jwt-decode'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router";

const Profile = () => {

    const name = useRef('');
    const email = useRef('');
    const [avatar, setAvatar] = useState('');
    const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    if(token == null) {
      history.push({
        pathname: "/login"
      });
    } else {
      const decoded = jwt_decode(token);
      name.current = decoded.name;
      email.current = decoded.email;
      setAvatar(decoded.avatar);
    }
  })

    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div style={{float: 'left', margin: '20px'}} className="col-sm-8 mx-auto">
            <ListItemAvatar>
              <Avatar style={{ height: '100px', width: '100px' }} alt="Avatar alt text" src={`/images/${avatar}`} />
            </ListItemAvatar>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{name.current}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{email.current}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default Profile;
