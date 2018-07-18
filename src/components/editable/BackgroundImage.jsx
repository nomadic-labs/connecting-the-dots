import React from "react";

import Editable from "./Editable";
import ImageEditor from "../editingTools/ImageEditor";

import defaultImage from '../../assets/images/default_bg.jpg';

const BackgroundImage = props => {
  const styles = {
    background: {
      backgroundImage: `url('${props.imageSrc || defaultImage}')`
    }
  };

  const handleSave = updatedContent => {
    props.handleSave(updatedContent);
  };

  return (
    <Editable
      editor={ImageEditor}
      handleSave={handleSave}
      content={{ imageSrc: props.imageSrc }}
      editCaption={false}
      showChildren
      fullWidth
    >
      <div
        className={`item owl-bg-img`}
        style={styles.background}
      >
        {props.children}
      </div>
    </Editable>
  );
};

export default BackgroundImage;
