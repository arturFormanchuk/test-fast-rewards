import React, {useContext} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../../components/Auth/Auth";
import firebaseConfig from "../../config/firebase-config";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"

function LoginPage() {

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = e.target.elements;
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/"/>;
  }

  return (
    <div>
      <Card className='login-register__card center'>
        <span className='login-register__label m-b-40px'>Login</span>
        <form className='w-100 d-flex' onSubmit={handleSubmit}>
          <Input className='m-b-40px' type='email' name='email' label='Email'/>
          <Input className='m-b-40px' type='password' name='password' label='Password'/>
          <Button type='submit' className='m-b-40px' title='Login'/>
        </form>
        <a className='login-register'>
          Don’t have an account yet?
          <span className='redirect' onClick={() => (history.push('/register'))}>Register</span>
        </a>
      </Card>
    </div>
  );
}

export default LoginPage;