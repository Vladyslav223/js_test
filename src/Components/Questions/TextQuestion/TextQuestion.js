import React from 'react';
import PropTypes from 'prop-types';

const TextQuestion = (props) => {
  const {
    id,
    body,
    value,
    handleChange,
    disabled,
    status,
    answer,
  } = props;

  return (
    <div>
      <span className="question__id"><p>{id}</p></span>
      <p className="question__body">{body}</p>
      <label htmlFor={`id-${id}`} />
      <input
        id={`id-${id}`}
        className={status ? 'right-answer' : 'wrong-answer'}
        disabled={disabled}
        onChange={event => handleChange({
          id,
          validate: !!value,
          answer: event.target.value,
        })}
        value={answer}
        type="text"
      />
    </div>
  );
};

TextQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.bool,
  body: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  answer: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

TextQuestion.defaultProps = {
  disabled: null,
  value: '',
  status: null,
  answer: '',
};

export default TextQuestion;
