import React from 'react'

import Editable from './Editable'
import RichTextEditor from '../editingTools/RichTextEditor'


const Paragraph = (props) => {
  return (
    <Editable
      editor={RichTextEditor}
      handleSave={props.handleSave}
      handleDelete={props.handleDelete}
      content={{ text: props.text }}
      { ...props }
    >
      <div className="col-md-6 col-sm-12">
        <div className={`text-large ${props.classes}`}
        dangerouslySetInnerHTML={ {__html: props.text} }>
        </div>
      </div>
    </Editable>
  );
};

export default Paragraph;