import api from '../Api';

export const register = newUser => {
  return api
    .post('users/register', newUser)
    .then(response => {
      return response;
    })
}

export const upload = (image) => {
  return api
    .post('users/upload', image)
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    })
}

export const login = user => {
  return api
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if(!response.error) {
        localStorage.setItem('usertoken', response);
      }
      return response;
    })
    .catch(err => {
      return err;
    })
}

export const deleteProfile = id => {
  return api
    .delete('users/profile/'+id)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    })
}


