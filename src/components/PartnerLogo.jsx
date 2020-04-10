import React from "react";

import {
  ImageUploadEditor,
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
        onContentChange={this.handleEditorChange("partner-image")}
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
    <div className="col-xs-12 col-sm-3 col-md-3">
      <Editable
        Editor={PartnerLogoEditor}
        handleSave={handleSave}
        content={content}
        {...props}
      >
        <div className="text-center margin-eight no-margin-lr no-margin-top xs-margin-nineteen xs-no-margin-lr xs-no-margin-top logo-container">
          <img src={content["partner-image"]["imageSrc"]} alt={content["partner-image"]["caption"]} />
          <span className="text-uppercase text-small display-block letter-spacing-2 margin-twelve no-margin-bottom black-text xs-margin-three xs-no-margin-lr xs-no-margin-bottom">{content["partner-image"]["caption"]}</span>
        </div>
      </Editable>
    </div>
  );
};

export default PartnerLogo;

