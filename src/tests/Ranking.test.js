import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Tela de Ranking', () => {
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
    localStorage.setItem('ranking', JSON.stringify([
      {
        picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Jogador 1',
        score: 100,
      },
      {
        picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Jogador 2',
        score: 80,
      },
      {
        picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Jogador 3',
        score: 50,
      },
    ]));
    const renderResult = renderWithRouterAndRedux(<App />, initialState, '/ranking');
    history = renderResult.history;
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renderiza corretamente o título da página', () => {
    expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
  });

  test('renderiza corretamente a lista de jogadores', () => {
    expect(screen.getByText('Jogador 1')).toBeInTheDocument();
    expect(screen.getByTestId('player-score-0')).toHaveTextContent('100');
    expect(screen.getByText('Jogador 2')).toBeInTheDocument();
    expect(screen.getByTestId('player-score-1')).toHaveTextContent('80');
    expect(screen.getByText('Jogador 3')).toBeInTheDocument();
    expect(screen.getByTestId('player-score-2')).toHaveTextContent('50');
  });

  test('redireciona para o login após clicar no botão voltar o início', async () => {
    userEvent.click(screen.getByTestId('btn-play-again'));
    expect(history.location.pathname).toBe('/');
  });
});
