// Institution Functions

import axios from 'axios'

export const instReg = newUser => {
  return axios
    .post('users/instReg', {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      institution_name: newUser.institution_name,
    })
    .then(response => {
      console.log('Registered')
    })
}

export const instLogin = user => {
  return axios
    .post('users/instLogin', {
      username: user.username,
      password: user.password,
      passwordCheck: user.passwordCheck
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/instProfile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}