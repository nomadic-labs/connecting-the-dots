import React from "react";
import Editable from './Editable';
import BackgroundImage from "./BackgroundImage";
import Paragraph from "./Paragraph";
import PlainTextEditor from '../editingTools/PlainTextEditor';

const LandingSection = props => {
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

  const updateParagraph = updated => {
    handleSave({ paragraph: updated.text });
  };

  const { content } = props;

  console.log('landing section content', content)

  return (
    <section className="no-padding">
      <div className="owl-slider-full owl-carousel owl-theme light-pagination square-pagination dark-pagination-without-next-prev-arrow main-slider">
        <BackgroundImage
          imageSrc={content.imageSrc}
          handleSave={updateImage}
        >
          <div className="opacity-light bg-dark-gray" />
          <div className="container full-screen position-relative">
            <div className="slider-typography text-left">
              <div className="slider-text-middle-main md-margin-eleven sm-margin-three xs-margin-thirteen">
                <div className="slider-text-middle slider-typography-option1">
                  <span className="white-text font-weight-800 letter-spacing-1 alt-font text-italic">
                    <Editable
                      editor={PlainTextEditor}
                      content={{ text: content.title }}
                      handleSave={updateTitle}
                    >
                      {content.title}
                    </Editable>
                  </span>
                  <div className="bg-fast-yellow separator-line-extra-thick no-margin-lr margin-twelve md-no-margin-lr md-margin-six" />
                  <Editable
                    editor={PlainTextEditor}
                    content={{ text: content.subtitle }}
                    handleSave={updateSubtitle}
                  >
                    <p className="white-text text-uppercase letter-spacing-2 alt-font xs-width-80">
                      {content.subtitle}
                    </p>
                  </Editable>
                </div>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </div>
    </section>
  );
};

export default LandingSection;
