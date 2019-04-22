// import createHistory from 'history/createBrowserHistory';
// Since, chrome extensions are not requesting any server but local machine build folder -- so they won't support client client routing.
// Therefore, we need to use hashHistory which will always load index.html irrespective of routing and load appropriate component after # location
import createHistory from 'history/createHashHistory';

// A singleton history object for easy API navigation
const history = createHistory();
export default history;
