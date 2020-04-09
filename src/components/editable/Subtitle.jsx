import React from 'react'
import Typography from '@material-ui/core/Typography';

import { Editable, PlainTextEditor } from "react-easy-editables";


const Subtitle = (props) => {
  const handleSave = (newContent) => () => {
    props.updateTitle(newContent.text)
  }

  return (
    <Typography variant="display2" gutterBottom>
      <Editable
        editor={PlainTextEditor}
        handleSave={handleSave}
        content={{ text: props.text }}
        { ...props }
      >
        { props.text }
      </Editable>
    </Typography>
  )
};

export default Subtitle;