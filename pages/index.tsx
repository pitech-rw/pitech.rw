import styles from '../styles/Index.module.css'
const indexPage = () => {
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
              <p>We love the number &pi;. Why? Because it has special (cool) properties.</p><br />
              <ul>
                <li>It has an infinite number of decimal places</li>
                <li>The digits are non-repeating</li>
                <li>The digits are non-terminating</li>
              </ul>
              <br />
              <p>We like to think of Technology through the same lenses. A tool that gives people endless opportunity where the limit is only your imagination.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardtreo}>
              <p>Do you find that intriguing? Is there something you &apos;d like to explore and see where it takes you? Drop us a line using the next form and we &apos; ll be happy to get in touch.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formCard}>
              <form>
                <div className={styles.formGroup}>
                  <input type="text" className={styles.formControl} id="username" placeholder="What should we call you?" />
                </div>
                <div className={styles.formGroup}>
                  <input type="email" className={styles.formControl} name="email" placeholder="Your email address" required/>
                </div>
                <div className={styles.formGroup}>
                  <textarea name="text" id="text" className={styles.textAreaControl} placeholder="your message" title="Pro-tip: resize this window by dragging the tiles in the bottom-corner" required></textarea>
                </div>
                
                <div className={styles.formGroup}>
                  <button id="form-submit" type="submit" className={styles.btnPrimary}>Send</button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </main>
      </div>
  )
}

export default indexPage