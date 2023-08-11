
const FooterBottom = () => {
    return (
      <div className="container d-md-flex py-4">
        <div className="me-md-auto text-center text-md-start">
          <div className="copyright">
            <p>Femi Adesola &copy; {new Date().getFullYear()}</p>
            <strong>
              <span> All Rights Reserved</span>
            </strong>
          </div>
        </div>
        <div className="social-links text-center text-md-end pt-3 pt-md-0">
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/femi-adesola-oyinloye-106454145/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            className="github"
            href="https://github.com/FemiAdesola"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-github"></i>
          </a>
          <a className="facebook" href="/" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
        </div>
      </div>
    );
};

export default FooterBottom;