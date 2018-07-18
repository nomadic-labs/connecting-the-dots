import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/index';

import PageContentContainer from '../containers/PageContentContainer'
import PageTitleContainer from '../containers/PageTitleContainer'

import { connect } from 'react-redux'
import { updatePageContent, updatePageMetaData } from '../redux/actions'

class BasicPage extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const { id, title, slug, page_type } = this.props.data.pages;
    const pageData = { id, title, slug, page_type };
    const content = {
      body: JSON.parse(this.props.data.pages.content)
    }
    this.props.onUpdatePageContent(content);
    this.props.onUpdatePageMetaData(pageData)
  }

  render() {
    return (
      <Layout>
        <PageContentContainer />
      </Layout>
    )
  }
};

function mapStateToProps(state) {
  return {
    content: state.content,
    pageData: state.pageData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdatePageContent: (content) => {
      dispatch(updatePageContent(content))
    },
    onUpdatePageMetaData: (pageData) => {
      dispatch(updatePageMetaData(pageData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicPage)


export const query = graphql`
  query BasicPageQuery($slug: String!) {
    pages(slug: { eq: $slug }) {
      id
      content
      title
      slug
      template
      page_type
    }
  }
`;