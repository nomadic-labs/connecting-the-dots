import React from "react";
import Editable from './Editable';
import BackgroundImage from "./BackgroundImage";
import PlainTextEditor from '../editingTools/PlainTextEditor';

const PopupSquare = props => {
  const handleSave = newContent => {
    props.updateContent(props.sectionIndex, props.index, newContent);
  };

  const updateTitle = updated => {
    handleSave({ title: updated.text });
  };

  const updateSubtitle = updated => {
    handleSave({ subtitle: updated.text });
  };

  const updateImage = updated => {
    handleSave({ imageSrc: updated.imageSrc });
  };

  const { content } = props;

  return (
    <div className="col-md-2 col-sm-6 no-padding team-style1 overflow-hidden">
      <div className="opacity-light"></div>
      <img src="images/toronto.jpg" alt=""/>
      <div className="team-mood text-center"><span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large">Ontario</span></div>
      <figure className="text-center padding-thirty">
        <figcaption>
          <span className="alt-font font-weight-100 text-small letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">627,715 Black Canadians</span>
          <span className="alt-font font-weight-100 text-large letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr"># Projects</span>
          </figcaption>
      </figure>
    </div>
  );
};

export default PopupSquare;
