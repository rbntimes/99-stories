import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import storiesApp from './reducers';
import { Switch, Route } from 'react-router-dom';
import Setup from './pages/setup';

import Main from './pages/main';
import Register from './pages/register';
import Login from './pages/login';
import Article from './pages/article';
import Header from './components/Header';

let store = createStore(
  storiesApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Setup} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/articles" component={Main} />
          <Route exact path="/articles/:niveau" component={Main} />
          <Route path="/articles/:niveau/:article" component={Article} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
