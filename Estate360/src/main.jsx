import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { WishlistProvider } from './components/WishlistContext';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);