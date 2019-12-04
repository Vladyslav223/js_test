
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import answers from '../../../api/answers.json';
import './RadioQuestion.scss';

class RadioQuestion extends Component {
  state = {
    id: '',
    validate: false,
    answer: [],
  }

  handleRadioState(value, key, index) {
    const inputedValue = [false, false, false, false];

    inputedValue[index] = value;

    const validate = inputedValue.some(input => input);

    this.setState({
      id: key,
      validate,
      answer: inputedValue,
    }, () => this.props.handleChange(this.state));
  }

  render() {
    const { body, id, disabled, answer } = this.props;
    const curentAnswer = answers.find(answr => answr.id === id);

    let index = 0;

    return (
      <div>
        <span className="question__id"><p>{id}</p></span>
        <p className="question__body">{body}</p>

        {curentAnswer.variants.map((variant, count) => {
          let checked = null;
          let curentAnswerRight = null;

          if (answer) {
            checked = answer[count];
          }

          if (disabled) {
            checked = answer && answer[count];
            curentAnswerRight = curentAnswer.right[count];
          }

          return (
            <div
              key={variant}
              className={curentAnswerRight
                ? 'radio-button right-variants'
                : 'radio-button'
              }
            >

              <input
                checked={checked}
                disabled={disabled}
                onChange={event => this.handleRadioState(
                  event.target.checked,
                  id,
                  count
                )}
                type="radio"
                id={`radio-variant${++index}`}
                name="radio"
              />
              <label
                className="radio-label"
                htmlFor={`radio-variant${index}`}
              >
                {variant}
              </label>

            </div>
          );
        })}

      </div>
    );
  }
}

RadioQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  answer: PropTypes.arrayOf(
    PropTypes.bool
  ),
  handleChange: PropTypes.func.isRequired,
};

RadioQuestion.defaultProps = {
  disabled: null,
  answer: '',
};

export default RadioQuestion;
