import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  LinkEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage } from "../firebase/operations"

class PartnerLogoEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }

  handleEditorChange = field => item => {
    this.setState({
      content: {
        ...this.state.content,
        [field]: {
          ...item
        }
      }
    });
  }

  render() {
    const { content } = this.state;

    return(
      <ImageUploadEditor
        content={content["partner-image"]}
        handleEditorChange={this.handleEditorChange("partner-image")}
        editCaption={true}
        uploadImage={uploadImage}
      />
    )
  }
}

const PartnerLogo = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <div className="col-xs-12 col-sm-3 col-md-3 text-center no-margin-bottom xs-margin-nineteen xs-no-margin-lr xs-no-margin-top logo-container">
      <Editable
        Editor={PartnerLogoEditor}
        handleSave={handleSave}
        content={content}
        {...props}
      >
        <img src={content["partner-image"]["imageSrc"]} alt={content["partner-image"]["caption"]} />
        <span className="text-uppercase text-small display-block letter-spacing-2 margin-twelve no-margin-bottom black-text xs-margin-three xs-no-margin-lr xs-no-margin-bottom">{content["partner-image"]["caption"]}</span>
      </Editable>
    </div>
  );
};

export default PartnerLogo;

