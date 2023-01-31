import { useState, useContext} from 'react'
import styles from '../styles/Index.module.css'
import { collection, addDoc } from 'firebase/firestore'
import storage from  '../service/firebase'
import  Modal from './modal'

const IndexPage = () => {

  const [message, setMessage] = useState({})
  const updateMessage = (e: any) => {
    const {name} = e.target;
    const {value} =e.target;
    setMessage((values)=>({...values,[name]:value}))
  }

  const saveContactMessage = async (e: any) => {
    e.preventDefault()

    try {
      await addDoc(collection(storage, "contacts"), message)
      
      setTimeout(() => {
      }, 10000);
    } catch (e) {
    //TO DO: tracking
    }
  }

  return (
    <div>
     
      <main>
        <div className={styles.container}>
          <div className={styles.card}>
            <header className={styles.carduno}>
              <h1>We are Pi Tech</h1>
              <h2>Nice to meet you.</h2>
            </header>
          </div>
          <div className={styles.card}>
            <div className={styles.cardduo}>
              <p>We like to look at Technology as a tool that gives people endless possibilities where the limit is only your imagination.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardtreo}>
              <p>Is there a software project you &apos;d like to explore and see where it takes you? Or you need maintainance for your website?<br /><br/>Drop us a line using the next form, we &apos; ll be happy to get in touch.</p>
            </div>
          </div>
          <div className={styles.card}>
                
            <div className={styles.formCard}>
              <form onSubmit={saveContactMessage}>
                <div className={styles.formGroup}>
                  <input type="text" onChange={updateMessage} className={styles.formControl} name="name" placeholder="What should we call you?" />
                </div>
                <div className={styles.formGroup}>
                  <input type="email" onChange={updateMessage} className={styles.formControl} name="email" placeholder="Your email address" required/>
                </div>
                <div className={styles.formGroup}>
                  <textarea name="text" onChange={updateMessage}  id="text" className={styles.textAreaControl} placeholder="your message" title="Pro-tip: resize this window by dragging the tiles in the bottom-corner" required></textarea>
                </div>
                
                <div className={styles.formGroup}>
                  <button id="form-submit" type="submit" className={styles.btnPrimary}>Send</button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </main>
      <Modal>
        <h2>Thanks for reaching out!</h2>
        <p>We&apos;ll get back to you in less than 24 hours.</p>
      </Modal>
    </div>
  )
}

export default IndexPage