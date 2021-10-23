import axios from 'axios';
import {useEffect, useState} from 'react'

import './App.css';

const init = (setSignedIn) => {
  axios.get('/api/v1/session')
  .then(res => {
    setSignedIn(true)
  })
  .catch(err => {
    setSignedIn(false)
  })
} 

const App = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  useEffect(() => init(setSignedIn), []);



  if(!isSignedIn) {
    return <>
    <button onClick={() => {
      axios.post('/api/v1/user', {
        firstName: 'Cameron',
        lastName: 'White',
        email: 'cmw24375@gmail.com',
        password: 'password',
        passwordConfirm: 'password',
      })
      .then((res) => {

      })
      .catch((err) => {

      })
    }}>
      Click me to create account
    </button>

    </>
  } 

  return <>
  </>
  
}
export default App;
