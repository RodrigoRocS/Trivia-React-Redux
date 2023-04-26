import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Tela de Feedback', () => {
  let playerPicture;
  let playerName;
  let playerScore;
  let feedbackText;
  let totalScore;
  let totalQuestion;
  let playAgainBtn;
  let rankingBtn;
  let history;

  beforeEach(() => {
    const initialState = {
      questionsAnswers: {
        tokenIsValid: '',
        questions: [],
        currentQuestion: 0,
        disable: true,
      },
      player: {
        gravatarEmail: '',
        name: '',
        score: 0,
        assertions: 0,
      },
    };
    const renderResult = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    history = renderResult.history;

    playerPicture = screen.getByTestId('header-profile-picture');
    playerName = screen.getByTestId('header-player-name');
    playerScore = screen.getByTestId('header-score');
    feedbackText = screen.getByTestId('feedback-text');
    totalScore = screen.getByTestId('feedback-total-score');
    totalQuestion = screen.getByTestId('feedback-total-question');
    playAgainBtn = screen.getByTestId('btn-play-again');
    rankingBtn = screen.getByTestId('btn-ranking');
  });

  test('renderiza corretamente as informações do jogador', () => {
    expect(playerPicture).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
  });

  test('redireciona para o login após clicar no botão de jogar novamente', async () => {
    userEvent.click(playAgainBtn);

    const loginPage = await screen.findByTestId('input-player-name');

    expect(history.location.pathname).toBe('/');
    expect(loginPage).toBeInTheDocument();
  });

  test('redireciona para o ranking após clicar no botão ranking', async () => {
    userEvent.click(rankingBtn);

    const rankingPage = await screen.findByTestId('ranking-title');

    expect(history.location.pathname).toBe('/ranking');
    expect(rankingPage).toBeInTheDocument();
  });
});

describe('Feedback com pontuação menor que 3', () => {
  test("renderiza 'Could be Better...' quando o número de acertos é menor que 3", () => {
    const initialState = {
      questionsAnswers: {
        tokenIsValid: '',
        questions: [],
        currentQuestion: 0,
        disable: true,
      },
      player: {
        gravatarEmail: '',
        name: '',
        score: 0,
        assertions: 2,
      },
    };
    const renderResult = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Could be Better...');
  });
});

describe('Feedback com pontuação maior ou igual a 3', () => {
  test("renderiza 'Well Done' quando o número de acertos é maior ou igual a 3", () => {
    const initialState = {
      questionsAnswers: {
        tokenIsValid: '',
        questions: [],
        currentQuestion: 0,
        disable: true,
      },
      player: {
        gravatarEmail: '',
        name: '',
        score: 0,
        assertions: 5,
      },
    };
    const renderResult = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Well Done');
  });
});