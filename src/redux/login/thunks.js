import { apiWrapper } from '../reduxCreator';
import { login } from './actions';

export function loginThunk() {
  return dispatch => {
    apiWrapper(
      dispatch,
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
    )
      .then(() => {
        dispatch(login());
      })
      .catch(err => {
        console.log(err);
      });
  };
}
