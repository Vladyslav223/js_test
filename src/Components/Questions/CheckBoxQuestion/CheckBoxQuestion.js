import React, { Component } from 'react';
import PropTypes from 'prop-types';
import answers from '../../../api/answers.json';
import './CheckBoxQuestion.scss';

class CheckBoxQuestion extends Component {
  state = {
    id: '',
    validate: false,
    answer: [false, false, false, false],
  }

  handleCheckStateAndProps(value, key, index) {
    this.setState((prevState) => {
      const inputedValue = prevState.answer;

      inputedValue[index] = value;

      const val = inputedValue.some(input => input);

      return ({
        id: key,
        validate: val,
        answer: inputedValue,
      });
    }, () => this.props.handleChange(this.state));
  }

  render() {
    const {
      body,
      id,
      disabled,
      answer,
    } = this.props;
    const currentAnswer = answers.find(item => item.id === id);
    let index = 0;

    return (
      <div>
        <span className="question__id"><p>{id}</p></span>
        <p className="question__body">{body}</p>
        {currentAnswer.variants.map((variant, count) => {
          let checked = null;
          let curentAnswerRight = null;

          if (answer) {
            checked = answer[count];
          }

          if (disabled) {
            checked = answer && answer[count];
            curentAnswerRight = currentAnswer.right[count];
          }

          return (
            <div
              className={
                curentAnswerRight
                  ? 'checkbox right-variants'
                  : 'checkbox'
              }
              key={variant}
            >
              <input
                checked={checked}
                disabled={disabled}
                id={`checkboxVariant${++index}`}
                onChange={event => this
                  .handleCheckStateAndProps(event.target.checked, id, count)}
                type="checkbox"
              />
              <label htmlFor={`checkboxVariant${index}`}>
                {variant}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

CheckBoxQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  answer: PropTypes.arrayOf(
    PropTypes.bool
  ),
  handleChange: PropTypes.func.isRequired,
};

CheckBoxQuestion.defaultProps = {
  disabled: null,
  answer: null,
};
export default CheckBoxQuestion;
