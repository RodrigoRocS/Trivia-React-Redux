import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { token } from './mocks/fetch';

describe('Tela de Login', () => {
  let inputEmail;
  let inputName;
  let buttonPlay;
  let buttonSettings;
  const mockName = 'Name';
  const mockEmail = 'user@test.com';
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
    const renderResult = renderWithRouterAndRedux(<App />, initialState);
    inputName = screen.getByTestId('input-player-name');
    inputEmail = screen.getByTestId('input-gravatar-email');
    buttonPlay = screen.getByTestId('btn-play');
    buttonSettings = screen.getByTestId('btn-settings');
    history = renderResult.history;
  });

  test('renderiza os elementos corretamente', () => {
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  });

  test('permite digitar nos inputs de nome e email', async () => {
    userEvent.type(inputName, mockName);
    userEvent.type(inputEmail, mockEmail);

    expect(inputName).toHaveValue(mockName);
    expect(inputEmail).toHaveValue(mockEmail);
  });

  test('botão "Play" é desabilitado caso email e/ou nome não estejam preenchidos', async () => {
    expect(buttonPlay).toBeDisabled();
  
    userEvent.type(inputName, mockName);
  
    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputEmail, mockEmail);
  
    expect(buttonPlay).not.toBeDisabled();
  });

  test('é feita uma requisição à api e o token recebido é salvo no localStorage ao clicar no botão Play', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    })

    userEvent.type(inputName, mockName);
    userEvent.type(inputEmail, mockEmail);

    userEvent.click(buttonPlay);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://opentdb.com/api_token.php?command=request',
    );

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(token.token);
    });
  });
  
  test('redireciona para /game após clicar no botão play ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    })

    userEvent.type(inputName, mockName);
    userEvent.type(inputEmail, mockEmail);

    userEvent.click(buttonPlay);

    const gamePage = await screen.findByTestId('game-page');

    expect(history.location.pathname).toBe('/game');
    expect(gamePage).toBeInTheDocument();
  });
  
  test('redireciona para /config após clicar no botão de configurações ', async () => {
    userEvent.click(buttonSettings);

    const configPage = await screen.findByTestId('config-page');

    expect(history.location.pathname).toBe('/config');
    expect(configPage).toBeInTheDocument();
  });
});
