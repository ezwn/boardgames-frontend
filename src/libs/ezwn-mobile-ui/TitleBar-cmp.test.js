import React from 'react';
import { render } from '@testing-library/react';
import { TitleBar } from './TitleBar-cmp';

test('renders learn react link', () => {
  const testTitle = 'ABCDEF';

  const titleBar = render(<TitleBar title={testTitle} />);
  
  const titleElement = titleBar.getByText(testTitle);
  expect(titleElement).toBeInTheDocument();
});
