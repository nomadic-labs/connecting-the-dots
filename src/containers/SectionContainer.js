import React from 'react';
import { connect } from 'react-redux';

import {
  updateSectionContent,
  duplicateSection,
  deleteSection,
  addContentItem,
  deleteContentItem,
  addSection,
  saveChanges,
} from '../redux/actions'
import InnerContentContainer from '../containers/InnerContentContainer';


const mapStateToProps = (state) => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSectionContent: (sectionIndex, contentIndex, newContent) => {
      dispatch(updateSectionContent(sectionIndex, contentIndex, newContent))
    },
    onDuplicate: (sectionIndex) => {
      dispatch(duplicateSection(sectionIndex))
    },
    onDelete: (sectionIndex) => {
      dispatch(deleteSection(sectionIndex))
    },
    onAddContentItem: (sectionIndex, contentType) => {
      dispatch(addContentItem(sectionIndex, contentType))
    },
    onDeleteContentItem: (sectionIndex, contentIndex) => {
      dispatch(deleteContentItem(sectionIndex, contentIndex))
    },
    onAddSection: (sectionIndex, sectionType) => {
      dispatch(addSection(sectionIndex, sectionType))
    },
    saveChanges: (innerFunction) => {
      dispatch(saveChanges(innerFunction))
    }
  }
}

const SectionContainer = (props) => {

    return (
      <section className="wow fadeIn">
        <div className="container">
          <div className="row xs-text-center">
            <InnerContentContainer
              sectionIndex={props.index}
              content={props.content}
              onUpdate={props.onUpdateSectionContent}
              onDelete={props.onDelete}
              onDuplicate={props.onDuplicate}
              onAddContentItem={props.onAddContentItem}
              onDeleteContentItem={props.onDeleteContentItem}
              onAddSection={props.onAddSection}
              saveChanges={props.saveChanges}
            />
          </div>
        </div>
      </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);