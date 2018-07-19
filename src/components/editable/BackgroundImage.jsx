import React from "react";

import Editable from "./Editable";
import ImageEditor from "../editingTools/ImageEditor";

const defaultImage = "http://placehold.it/2000x1000";

const BackgroundImage = ({ content, handleSave, children }) => {
  const imageUrl = content && content.imageSrc ? content.imageSrc : defaultImage;
  const styles = {
    background: {
      backgroundImage: `url('${imageUrl}')`
    }
  };

  const onSave = updatedContent => {
    handleSave(updatedContent);
  };

  return (
    <Editable
      editor={ImageEditor}
      handleSave={onSave}
      content={content || {}}
      editCaption={false}
      showChildren
      fullWidth
    >
      <div
        className={`item owl-bg-img`}
        style={styles.background}
      >
        {children}
      </div>
    </Editable>
  );
};

export default BackgroundImage;
