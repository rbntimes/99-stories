import { combineReducers } from 'redux';
import stories from './stories';

const storiesApp = combineReducers({
  stories,
});

export default storiesApp;
