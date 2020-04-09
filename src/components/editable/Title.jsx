import React from "react";
import Typography from "@material-ui/core/Typography";

import { Editable, PlainTextEditor } from "react-easy-editables";

const Title = props => {
  const handleSave = newContent => () => {
    props.updateTitle(newContent.text);
  };

  return (
    <Typography variant="display1" gutterBottom>
      <Editable
        editor={PlainTextEditor}
        handleSave={handleSave}
        content={{ text: props.text }}
        {...props}
      >
        {props.text}
      </Editable>
    </Typography>
  );
};

export default Title;
