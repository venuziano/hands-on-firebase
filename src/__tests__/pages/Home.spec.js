import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Home from '../../pages/Home';

const mockedHistoryPush = jest.fn();
window.alert = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }) => children,
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    window.alert.mockClear();
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign out', async () => {
    const { getByTestId } = render(<Home />);

    const btnNode = await waitFor(
      () => getByTestId('btn-logout')
    );

    fireEvent.click(btnNode);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
