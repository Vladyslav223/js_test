import React from 'react';

import PropTypes from 'prop-types';
import answers from '../../../api/answers.json';
import './SelectQuestion.scss';

const SelectQuestion = (props) => {
  const { body, id, value, handleChange, disabled, answer } = props;
  const curentAnswer = answers.find(answr => answr.id === id);
  const validate = value !== 0;

  return (
    <div className="question select">
      <span className="question__id"><p>{id}</p></span>
      <p className="question__body">{body}</p>
      <br />
      <select
        disabled={disabled}
        onChange={event => handleChange({
          id: props.id,
          validate,
          answer: event.target.value,
        })}
        value={answer}
      >
        <option value="0" hidden>Select answer</option>
        {curentAnswer.variants.map(variant => (
          <option
            key={variant}
            value={variant}
          >
            {variant}
          </option>
        ))}
      </select>
      <div className="select__arrow" />
    </div>
  );
};

SelectQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  answer: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

SelectQuestion.defaultProps = {
  disabled: null,
  value: '',
  answer: '',
};

export default SelectQuestion;
