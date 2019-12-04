import React from 'react';
import PropTypes from 'prop-types';
import './NumberQuestion.scss';

const NumberQuestion = (props) => {
  const { id, body, disabled, answer } = props;
  const validate = true;

  return (
    <div>
      <span className="question__id"><p>{id}</p></span>
      <label htmlFor={props.id}>
        <p className="question__body">{body}</p>
        <input
          disabled={disabled}
          onChange={event => props.handleChange({
            id: props.id,
            validate,
            answer: event.target.value,
          })}
          value={answer}
          type="number"
        />
      </label>
    </div>
  );
};

NumberQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  answer: PropTypes.string,
};

NumberQuestion.defaultProps = {
  disabled: null,
  answer: '',
  handleChange: () => {},
};

export default NumberQuestion;
