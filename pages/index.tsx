import styles from '../styles/Index.module.css'
const indexPage = () => {
  return (
    <div>
     <header>
        <div className="header-wrapper">
          <figure className="logo">
            <a href="index.html">
              <p className="logo">Pi Tech</p>
            </a>
          </figure>
          <nav className="nav-wrapper">
            <ul>
              <li><a href="./index.html#form">About</a></li>
              <li><a href="./contact.html">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
      <div className={styles.card}>
        <h2>CARD</h2>
        <div className={styles.formCard}>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" id="username" placeholder="What should we call you?" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" name="email" placeholder="Your email address" required/>
            </div>
            <div className="form-group">
              <textarea name="text" id="text" className="form-control" placeholder="your message" title="Pro-tip: resize this window by dragging the tiles in the bottom-corner" required></textarea>
            </div>
            
            <div className="form-group">
              <button id="form-submit" type="submit" className="btn-primary form-control">Send</button>
            </div>
          </form>
        </div>
      </div>
        <section className="jumbotron">
          <h2>Pi Tech</h2>
          <p>Welcome to Pi Tech, </p>
        </section>
      
      </main>
      <div className="modal closed" id="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Thanks! </h2>
          <button className="btn"><span className="close-btn">&times;</span></button>
          </div>
          <div className="modal-body">
            <p>Sit back! You  should receive an email with your translation within an hour.</p>
          </div>
          <div className="modal-footer">
            <button className="thanks-btn">Okay!</button>
          </div>
        </div>
      </div>
      </div>
  )
}

export default indexPage