const indexPage = () => {
  return (
    <div>
     <header>
        <div className="header-wrapper">
          <figure className="logo">
            <a href="index.html">
              <p className="logo">Boni</p>
            </a>
          </figure>
          <nav className="nav-wrapper">
            <ul>
              <li><a href="./index.html#form">Translation</a></li>
              <li><a href="./contact.html">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section className="jumbotron">
          <h2>Translations by humans</h2>
          <p>There will be a time when translations will be done by robots. Until then, we can only rely on humans for accurate translations</p>
        </section>
        <div className="form-card">
        <p>Leave your text here and you will get a translation in an hour</p>
          <form onsubmit="return false " id='form' method="post">
            <div className="form-group">
              <input type="text" className="form-control" id="username" placeholder="What should we call you?" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" name="email" placeholder="Your email address" required/>
            </div>
            <div className="form-group">
              <textarea name="text" maxlength="1000" id="text" cols="30" rows="10" className="form-control" placeholder="your text (less than 1000 characters)" title="Pro-tip: resize this window by dragging the tiles in the bottom-corner" required></textarea>
            </div>
            <div className="form-group">
              <label for="language">Translate to: </label>
              <select name="language" id="language" className="form-control">
                <option value="kiny">Kinyarwanda</option>
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="form-group">
              <button id="form-submit" type="submit" className="btn-primary form-control">Send</button>
            </div>
          </form>
        </div>
      </main>
      <footer>
        <div className="footer-wrapper">
          <p>&copy; 2017 Boni</p>
        </div>
      </footer>
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