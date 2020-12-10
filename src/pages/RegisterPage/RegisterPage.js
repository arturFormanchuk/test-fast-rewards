import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import firebaseConfig from '../../config/firebase-config';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import firebase from "firebase";

function RegisterPage() {

  const history = useHistory()

  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password, last, first} = e.target.elements;
    try {
      await firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(function (user) {
          console.log(user.user.uid)
          firebase.database().ref(`users/${user.user.uid}`).set(
            {
              lastName: last.value,
              firstName: first.value,
              bigScreenTimer: 0,
              smallScreenTimer: 0
            }
          )
        })

      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/"/>;
  }

  return (
    <div>
      <Card className='login-register__card center'>
        <span className='login-register__label m-b-20px'>Register</span>
        <form className='w-100 d-flex' onSubmit={handleSubmit}>
          <Input className='m-b-20px' type='text' name='first' label='First Name'/>
          <Input className='m-b-20px' type='text' name='last' label='Last Name'/>
          <Input className='m-b-20px' type='email' name='email' label='Email'/>
          <Input className='m-b-20px' type='password' name='password' label='Password'/>
          <Button type='submit' title='Register'/>
        </form>
        <a className='login-register'>
          Already registered?
          <span className='redirect' onClick={() => (history.push('/login'))}>Log in</span>
        </a>
      </Card>
    </div>
  );
}

export default RegisterPage