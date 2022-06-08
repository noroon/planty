import { render, screen } from '@testing-library/react';
import Alert from './Alert';

const testClassName = 'testClassName';
const testMessage = 'testMessage';

beforeEach(() => {
  render(<Alert className={testClassName} value={testMessage} />);
});

test('renders alert with correct message', () => {
  const element = screen.getByText(testMessage);
  expect(element).toBeInTheDocument();
});

test('renders alert with correct className', () => {
  const element = screen.getByText(testMessage);
  expect(element.className).toEqual(`alert mt-3 ${testClassName}`);
});
