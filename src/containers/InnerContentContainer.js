import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";

import Header from "../components/editable/Header";
import Paragraph from "../components/editable/Paragraph";
import Image from "../components/editable/Image";
import FileUpload from "../components/editable/FileUpload";
import Button from "../components/editable/Button";
import Action from "../components/editable/Action";
import Phase from "../components/editable/Phase";
import Statistic from "../components/editable/Statistic";
import PopupSquare from "../components/editable/PopupSquare";
import FeatureBox from "../components/editable/FeatureBox";

import SectionEditingActions from "../containers/SectionEditingActions";

const generateContentComponents = (
  contentJson = [],
  sectionIndex,
  onUpdate,
  onAddContentItem,
  onDeleteContentItem
) => {
  return map(contentJson, (obj, index) => {
    console.log('INNER CONTENT ITEM', obj)
    if (!obj) {
      return console.log("Obj is undefined");
    }
    switch (obj.type) {
      case "header":
        return (
          <Header
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            deleteContent={onDeleteContentItem}
            text={obj.text}
          />
        );
      case "paragraph":
        return (
          <Paragraph
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            deleteContent={onDeleteContentItem}
            text={obj.text}
          />
        );
      case "phase":
        return (
          <Phase
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            header={obj.header}
            description={obj.description}
            deleteContent={onDeleteContentItem}
            content={obj}
          />
        );
      case "image":
        return (
          <Image
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            source={obj.source}
            caption={obj.caption}
            deleteContent={onDeleteContentItem}
          />
        );
      case "file":
        return (
          <FileUpload
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            filepath={obj.filepath}
            title={obj.title}
            filetype={obj.filetype}
            deleteContent={onDeleteContentItem}
          />
        );
      case "button":
        return (
          <Button
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            anchor={obj.anchor}
            link={obj.link}
            updateContent={onUpdate}
            deleteContent={onDeleteContentItem}
          />
        );
      case "action":
        return (
          <Action
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            anchor={obj.anchor}
            link={obj.link}
            updateContent={onUpdate}
            deleteContent={onDeleteContentItem}
          />
        );
      case "statistic":
        return (
          <Statistic
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            content={obj}
            updateContent={onUpdate}
            deleteContent={onDeleteContentItem}
          />
        );
      case "popup_square":
        return (
          <PopupSquare
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            content={obj}
            updateContent={onUpdate}
            deleteContent={onDeleteContentItem}
          />
        );
      case "feature_box":
        return (
          <FeatureBox
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            content={obj}
            updateContent={onUpdate}
            deleteContent={onDeleteContentItem}
          />
        );
      default:
        console.log("No component defined for " + obj.type);
        return null;
    }
  });
};

const InnerContentContainer = props => {
  return (
    <div style={{ ...props.styles }}>
      {generateContentComponents(
        props.content,
        props.sectionIndex,
        props.onUpdate,
        props.onAddContentItem,
        props.onDeleteContentItem
      )}
      {props.isEditingPage && <SectionEditingActions {...props} />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage
  };
};
export default connect(mapStateToProps, null)(InnerContentContainer);
