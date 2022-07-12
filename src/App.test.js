import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // 下のlearn reactを囲んでいる/xxxx/iは、大文字小文字を区別しないという意味らしい
  const linkElement = screen.getByText(/react/i);
  expect(linkElement).toBeInTheDocument();
});
