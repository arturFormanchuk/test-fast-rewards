import React, {useContext, useState, useEffect} from "react";
import './mainPage.css'
import {Redirect} from "react-router-dom";
import {AuthContext} from "../../components/Auth/Auth";
import firebaseConfig from "../../config/firebase-config";
import firebase from "firebase";
import Card from "../../components/Card/Card";

function MainPage() {

  const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

  const [bigScreen, setBigScreen] = useState(0)
  const [smallScreen, setSmallScreen] = useState(0)

  let width = window.innerWidth

  const updateTimerBig = (uid, bigScreenTimer) => {

    let postData = {
      bigScreenTimer,
    }

    firebase.database().ref(`users/${userId}`).update(postData)
  }
  const updateTimerSmall = (uid, smallScreenTimer) => {

    let postData = {
      smallScreenTimer,
    }

    firebase.database().ref(`users/${userId}`).update(postData)
  }

  const setBig = () => {
    setBigScreen(bigScreen => bigScreen + 1)

  }
  const setSmall = () => {
    setSmallScreen(smallScreen => smallScreen + 1)
  }

  let timerRef = firebase.database().ref('users/' + userId)

  useEffect(() => {
    timerRef.once('value').then(function (snapshot) {
      const data = snapshot.val()
      setBigScreen(data.bigScreenTimer)
      setSmallScreen(data.smallScreenTimer)
    })
    let timer = setInterval(async function () {
      if (width > 400) {
        setBig()
      } else if (width <= 400) {
        setSmall()
      }

    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const updateHelper = async () => {
    let data = {}
    await timerRef.once('value').then(function (snapshot) {
      data = snapshot.val()
      if (width <= 400) {
        setBigScreen(data.bigScreenTimer)
      }
      if (width > 400) {
        setSmallScreen(data.smallScreenTimer)
      }
    })
    if (width <= 400) {
      await updateTimerSmall(userId, smallScreen)
    } else if (width > 400) {
      await updateTimerBig(userId, bigScreen)
    }

  }

  useEffect(() => {
    updateHelper()
  }, [bigScreen, smallScreen])

  const {currentUser} = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login"/>;
  }

  function secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h < 10 ? '0' + h + ':' : h + ':';
    let mDisplay = m < 10 ? '0' + m + ':' : m + ':';
    let sDisplay = s < 10 ? '0' + s : s;
    return hDisplay + mDisplay + sDisplay;
  }

  return (
    <div className='height100'>
      <a className='main__logout' onClick={() => firebaseConfig.auth().signOut()}>Log out</a>
      <div className='main__container'>
        <div className='card_container'>
          <span className='screen_label'>Desktop</span>
          <Card className='main__card position_relative'>
            <div className='center timer'>{secondsToHms(bigScreen)}</div>
          </Card>
        </div>
        <div className='card_container'>
          <span className='screen_label'>Mobile</span>
          <Card className='main__card position_relative'>
            <div className='center timer'>{secondsToHms(smallScreen)}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MainPage