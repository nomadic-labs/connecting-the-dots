import React from "react";

import Editable from "./Editable";
import StatisticEditor from "../editingTools/StatisticEditor";

const Statistic = props => {
  const handleSave = content => {
    props.handleSave(content);
  };

  const content = props.content || {};

  return (
    <div className="col-md-3 col-sm-4 border-right counter-style1 xs-margin-nineteen xs-no-margin-lr xs-no-margin-top xs-no-border">
      <Editable
        editor={StatisticEditor}
        handleSave={handleSave}
        content={content}
      >
        <span
          className="timer counter-number alt-font font-weight-500 black-text"
          data-to={content.number}
          data-speed="1000"
        />
        <span className="text-small font-weight-200 letter-spacing-2 text-uppercase margin-four no-margin-lr display-block alt-font xs-margin-two xs-no-margin-lr xs-no-margin-buttom">
          {content.label}
        </span>
      </Editable>
    </div>
  );
};

export default Statistic;
