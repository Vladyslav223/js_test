/* eslint-disable no-prototype-builtins */
import React from 'react';
import PropTypes from 'prop-types';

import './QuestionList.scss';

import CheckBoxQuestion from '../Questions/CheckBoxQuestion/CheckBoxQuestion';
import NumberQuestion from '../Questions/NumberQuestion/NumberQuestion';
import RadioQuestion from '../Questions/RadioQuestion/RadioQuestion';
import SelectQuestion from '../Questions/SelectQuestion/SelectQuestion';
import TextQuestion from '../Questions/TextQuestion/TextQuestion';

export const questionTypes = {
  text: TextQuestion,
  checkbox: CheckBoxQuestion,
  radio: RadioQuestion,
  select: SelectQuestion,
  number: NumberQuestion,
};

const QuestionList = (props) => {
  const { disabled, questions, answers, handleChange } = props;

  return (
    <form>
      {questions.map((question) => {
        const { type, body, id, answer, isRight } = question;
        const Question = questionTypes[type];
        let isRightClass = '';

        if (question.hasOwnProperty('isRight')) {
          isRightClass = isRight ? 'right' : 'wrong';
        }

        return (
          <div
            key={`${type} ${id}`}
            className={`${isRightClass} question`}
          >
            <Question
              answers={answers}
              answer={answer}
              status={isRight}
              value={answer}
              disabled={disabled}
              handleChange={handleChange}
              body={body}
              id={id}
            />
          </div>
        );
      })}
    </form>
  );
};

QuestionList.propTypes = {
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      value: PropTypes.string,
    })
  ),
  answers: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ),
};

QuestionList.defaultProps = {
  disabled: null,
  questions: PropTypes.arrayOf(
    PropTypes.shape({ value: null })
  ),
  handleChange: () => {},
  answers: null,
};

export default QuestionList;
