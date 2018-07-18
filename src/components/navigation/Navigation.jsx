import React from "react";
import { Link, navigateTo } from "gatsby";
import { map, compact } from "lodash";

import AdminToolsContainer from "../../containers/AdminToolsContainer";
import AccountButton from "./AccountButton";

import firebase from "../../firebase/init";

const styles = {
  navbar: {
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
  },
  logo: {
    color: "#fff"
  }
};

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const sections = this.props.content || [];
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
                      className="nner-link text-medium"
                      data-scroll
                    >
                      Our Mission
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#about"}
                      className="nner-link text-medium"
                      data-scroll
                    >
                      Places
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#about"}
                      className="nner-link text-medium"
                      data-scroll
                    >
                      Areas of Focus
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#about"}
                      className="nner-link text-medium"
                      data-scroll
                    >
                      Projects
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#about"}
                      className="nner-link text-medium"
                      data-scroll
                    >
                      Blog
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#about"}
                      className="nner-link text-medium"
                      data-scroll
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-2 pull-right header-right text-right" style={{display: 'flex'}}>
                <AccountButton />
                <a
                  className="btn-small-white btn btn-small no-margin inner-link"
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
}
