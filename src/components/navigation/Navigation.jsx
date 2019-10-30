import React from "react";
import { EditableLink } from "react-easy-editables"

const styles = {
  fullWidth: {
    width: '100%'
  }
}


const Navigation = (props) => {
  const leftMenu = props.menuItems.left || [];
  const rightMenu = props.menuItems.right || [];

  const handleSaveMenu = (location, index) => content => props.onUpdateMenu(location, index, content)

  return (
    <div>
      <nav className="navbar no-margin-bottom">
        <div className="navigation-menu padding-two no-padding-top no-padding-bottom">
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
              style={styles.fullWidth}
            >
              <ul className="nav navbar-nav">
                { leftMenu.map((item, index) => (
                  <li key={item.content.link}>
                    <EditableLink
                      content={item.content}
                      onSave={handleSaveMenu('left', index)}
                      classes="inner-link text-medium"
                      data-scroll
                    />
                  </li>
                ))}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {
                  rightMenu.map((item, index) => (
                    <li key={item.content.link}>
                      <EditableLink
                        content={item.content}
                        onSave={handleSaveMenu('right', index)}
                        classes="btn-small-white btn btn-small no-margin inner-link"
                        data-scroll
                      />
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

Navigation.defaultProps = {
  menuItems: { left: [], right: [] }
}

export default Navigation;
