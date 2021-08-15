import { render } from '@testing-library/react';
import App from './App';

test('<App /> should be rendered', () => {
    const component = render(<App />);
    expect(component.container).toBeInTheDocument();
});
