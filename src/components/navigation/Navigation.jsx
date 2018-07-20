import React from "react";
import { Link } from "gatsby";


const Navigation = (props) => {
  const menuItems = props.menuItems ? props.menuItems : []
  return (
    <div>
      <nav className="navbar no-margin-bottom alt-font">
        <div className="container navigation-menu">
          <div className="row">
            <div className="col-lg-1 col-md-3 navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div
              className="col-lg-5 col-md-6 col-sm-9 collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">

                { menuItems.map(item => (
                  <li key={item.url}>
                    <Link
                      to={`${item.url}`}
                      className="inner-link text-medium"
                      data-scroll
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-4 col-md-2 pull-right header-right text-right" style={{display: 'flex', justifyContent: 'space-around' }}>
              <Link
                className="btn-small-white btn btn-small no-margin iinner-link"
                to="/project-form"
              >
                Submit a Project
              </Link>
              <a
                className="btn-small-white btn btn-small no-margin iinner-link"
                href="https://www.canadahelps.org/en/charities/black-history-ottawa-corporation/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
