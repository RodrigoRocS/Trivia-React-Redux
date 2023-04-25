import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { token } from './mocks/fetch';

describe('Feedback', () => {
  let inputEmail;
  let inputName;
  let buttonPlay;
  let playerPicture;
  let playerName;
  let playerScore;
  let feedbackText;
  let totalScore;
  let totalQuestion;
  let playAgainBtn;
  let rankingBtn;
  const mockName = 'Name';
  const mockEmail = 'user@test.com';
  let history;

  beforeEach(async () => {
    // Estado inicial
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
    // Renderiza o App
    const renderResult = renderWithRouterAndRedux(<App />, initialState);
    history = renderResult.history;
    // Faz o login
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    })
    userEvent.type(screen.getByTestId('input-player-name'), mockName);
    userEvent.type(screen.getByTestId('input-gravatar-email'), mockEmail);
    userEvent.click(screen.getByTestId('btn-play'));
    await screen.findByTestId('game-page');
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
  
  test("redireciona para '/' após clicar no botão de jogar novamente ", async () => {

  });

});
