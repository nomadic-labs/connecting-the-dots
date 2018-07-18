import React from "react";
import { Link } from "gatsby";

import AccountButton from "./AccountButton";


const Navigation = () => {
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
                <li>
                  <Link
                    to={"#about"}
                    className="inner-link text-medium"
                    data-scroll
                  >
                    Our Mission
                  </Link>
                </li>

                <li>
                  <Link
                    to={"#tour"}
                    className="inner-link text-medium"
                    data-scroll
                  >
                    Places
                  </Link>
                </li>

                <li>
                  <Link
                    to={"#areas-of-focus"}
                    className="inner-link text-medium"
                    data-scroll
                  >
                    Areas of Focus
                  </Link>
                </li>

                <li>
                  <Link
                    to={"#get-involved"}
                    className="inner-link text-medium"
                    data-scroll
                  >
                    Get involved
                  </Link>
                </li>

                <li>
                  <Link
                    to={"#contact"}
                    className="inner-link text-medium"
                    data-scroll
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-2 pull-right header-right text-right" style={{display: 'flex', justifyContent: 'space-around' }}>
              <AccountButton />
              <a
                className="btn-small-white btn btn-small no-margin iinner-link"
                href="#contact"
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
