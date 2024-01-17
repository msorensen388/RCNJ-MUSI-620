import './App.scss';

function App() {


  // console.log(process.env.REACT_APP_LINKS)
  const links = JSON.parse(process.env.REACT_APP_LINKS || {});

  const linkList = <ul>{links.map((link) => {
    console.log(link)
    return (
      <li>
        <a href={link.path}>{link.name}</a>
      </li>
    )
  })}</ul>;
  return (
    <main>
      <div className='container'>
        <div className="row">
          <div className="col">
            <header>
              <h1>MUSI-620 Creative Musical Coding Portfolio</h1>
              <h2>Michael Sorensen</h2>
              <h3>Ramapo College of New Jersey - Fall 2023</h3>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h3>Projects</h3>

            <div className="card">
              <div className="card-body bg-dark">
                {linkList}
              </div>
            </div>

            <h3>About</h3>

            <p>This is a collection of work in P5.js</p>

          </div>
        </div>
        <div className="row">
          <div className="col">
            <footer>
              <h3>More Information</h3>
              <ul className="link-list">
                <li><a href="https://github.com/msorensen388/RCNJ-MUSI-620">GitHub Repo</a></li>
                <li><a href="https://github.com/msorensen388">GitHub Profile</a></li>
                <li>
                  <a href="https://www.linkedin.com/in/michaelgsorensen/">LinkedIn</a>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
