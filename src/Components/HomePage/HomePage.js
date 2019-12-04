import React, { Component } from 'react';

import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Modal from '../Modal/Modal';
import QuestionList from '../QuestionList/QuestionList';
import answers from '../../api/answers.json';
import './HomePage.scss';

// eslint-disable-next-line
const API_URL = 'https://gist.githubusercontent.com/Vladyslav223/d438456f5d51277a7dd7d9a3eec65f62/raw/68db8e84ec11de515090c8201b3f8cdb4fe27316/questions.json';

class HomePage extends Component {
  state = {
    questions: [],
    showModal: false,
    count: 0,
    results: null,
    isLoading: true,
    redirectToResults: false,
    redirectToHome: false,
  }

  componentDidMount = async() => {
    const data = JSON.parse(localStorage.getItem('data'));

    if (data && data.length) {
      this.setState({
        questions: data,
        isLoading: false,
      });
    } else {
      const response = await fetch(API_URL);
      const questions = await response.json();

      this.setState({
        questions,
        isLoading: false,
      });
    }
  }

  componentDidUpdate() {
    const { questions } = this.state;

    localStorage.setItem('data', JSON.stringify(questions));
  }

  handleCancelClick = () => this.setState({ showModal: false });

  handleSubmitClick = () => this.runAnswersCheck();

  handleHome = () => this.setState({ redirectToHome: true });

  handleSubmit = (event) => {
    event.preventDefault();

    const { questions } = this.state;
    const validate = questions.every(question => question.validate);

    if (validate) {
      this.runAnswersCheck();
    } else {
      this.setState(
        { showModal: true }
      );
    }
  }

  handleChange = (object) => {
    const { id, answer, validate } = object;

    this.setState((prevState) => {
      const { questions } = prevState;

      return {
        ...prevState,
        questions: questions.map(question => (question.id !== id
          ? question
          : {
            ...question,
            answer,
            validate,
            id,
          })),
      };
    });
  }

  runAnswersCheck() {
    const { questions } = this.state;
    let count = 0;
    const results = questions.map((question) => {
      const answerRight = answers.find(answer => answer.id === question.id);
      const { answer } = question;
      let isRight = false;

      if (typeof answer === 'object') {
        isRight = JSON.stringify(answer) === JSON.stringify(answerRight.right);

        if (isRight) {
          count += 1;
        }
      } else {
        isRight = answer === answerRight.right;

        if (isRight) {
          count += 1;
        }
      }

      return {
        ...question,
        isRight,
      };
    });

    this.setState({
      count,
      results,
      redirectToResults: true,
    });
  }

  render() {
    const {
      questions,
      isLoading,
      results,
      showModal,
      redirectToResults,
      redirectToHome,
      count,
    } = this.state;

    if (redirectToResults) {
      this.setState(
        { redirectToResults: false }
      );

      return (
        <HashRouter>
          <Redirect to="/results" />
        </HashRouter>
      );
    }

    if (redirectToHome) {
      this.setState({
        redirectToHome: false,
        showModal: false,
      });

      return (
        <HashRouter>
          <Redirect to="/" />
        </HashRouter>
      );
    }

    return (
      <HashRouter>
        {isLoading
          ? (<div className="loading">loading...</div>)
          : (
            <div className="question-list">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <>
                      <h1>JavaScript test</h1>
                      <QuestionList
                        questions={questions}
                        handleChange={this.handleChange}
                      />
                      <button
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Ответить
                      </button>
                      {showModal
                        && (
                          <Modal
                            handleSubmitClick={this.handleSubmitClick}
                            handleCancelClick={this.handleCancelClick}
                          />
                        )}
                    </>
                  )}
                />
                <Route
                  path="/results"
                  render={() => (
                    <>
                      <h1>Результаты</h1>
                      <p>
                        {`Правильных овтетов: ${count} из ${questions.length}`}
                      </p>
                      {results
                        && (
                          <QuestionList
                            answers={answers}
                            disabled
                            questions={results}
                          />
                        )
                      }
                      <button
                        type="button"
                        onClick={this.handleHome}
                      >
                        На главную
                      </button>
                    </>
                  )}
                />
              </Switch>
            </div>
          )}
      </HashRouter>
    );
  }
}

export default HomePage;
