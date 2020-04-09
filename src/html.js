import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from 'gatsby'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script src={ withPrefix("/js/jquery.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/modernizr.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.easing.1.3.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/skrollr.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/smooth-scroll.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.appear.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.nav.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/bootstrap.min.js")} type="text/javascript"></script>

          <script src={ withPrefix("/js/wow.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/owl.carousel.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.countTo.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.parallax-1.1.3.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.magnific-popup.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/isotope.pkgd.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/imagesloaded.pkgd.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/classie.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/counter.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.fitvids.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/main.js")} type="text/javascript"></script>
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
