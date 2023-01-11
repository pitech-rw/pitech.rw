import './index.css'
import firebase from 'firebase/compat/app'
import {getFirestore, setDoc, doc} from 'firebase/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyDqbXOll1QNxBDNgxcghygtgEYlbZcmWF0",
    authDomain: "boni-a6c2b.firebaseapp.com",
    databaseURL: "https://boni-a6c2b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "boni-a6c2b",
    storageBucket: "boni-a6c2b.appspot.com",
    messagingSenderId: "378373042496",
    appId: "1:378373042496:web:feceb08a147e18ca5e0aa5"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

// Retrieve data from the form and send it to firebase
const parseForm = (event) => {
  event.preventDefault()

  // change the text of the button to sending
  document.getElementById('form-submit').innerHTML = 'Sending...'
let userForm = document.forms[0]
let username = userForm.elements['username'].value
let email = userForm.elements['email'].value
let text = userForm.elements['text'].value
let translateTo = userForm.elements['language'].value
  let ticket = {
    username,
    email,
    text,
    translateTo
  }
  createTranslationTicket(ticket)
}


let modal = document.querySelector('.modal')

const  createTranslationTicket = async (ticket) => {
  let db = getFirestore(app)

  try {
    const docRef = await setDoc(doc(db, "tickets", new Date().toJSON()), ticket);
    // display a modal to show the user that the ticket has been created
    modal.classList.toggle('closed')
    document.getElementById('form-submit').innerHTML = 'Send'
    // clear the form
    document.getElementById('form').reset()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const theForm = document.forms[0]
theForm.addEventListener('submit', parseForm)


let closeBtn = document.querySelector('.close-btn')
let thanksBtn = document.querySelector('.thanks-btn')

const closeModal = () => {
modal.classList.add('closed')
}
closeBtn.addEventListener('click', closeModal)
thanksBtn.addEventListener('click', closeModal)

