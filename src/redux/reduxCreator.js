import { success, error } from 'react-notification-system-redux';
import _ from 'lodash';
import { changeMainLoadingStatus } from './loading/actions';

export function makeConstantCreator(...params) {
  const constant = {};
  _.each(params, param => {
    constant[param] = param;
  });
  return constant;
}

export const makeActionCreator = (type, params = null) => ({ type, ...params });

export const makeReducerCreator = (initialState = null, handlers = {}) => (
  state = initialState,
  action,
) => {
  if (!action && !action.type) return state;
  const handler = handlers[action.type];
  return (handler && handler(state, action)) || state;
};

export const apiWrapper = (
  dispatch,
  apiFunc,
  isShowSuccessNoti = true,
  ms = 10000,
) => {
  dispatch(changeMainLoadingStatus(true));

  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject({ message: 'Request timeout. Please try again!!!!' });
    }, ms);
  });

  const promise = new Promise((resolve, reject) => {
    apiFunc
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([timeout, promise])
    .then(res => {
      dispatch(changeMainLoadingStatus(false));
      if (isShowSuccessNoti) {
        dispatch(
          success({
            title: 'Done',
            message: 'Process sucessfully',
            autoDismiss: 5,
          }),
        );
      }
      return res;
    })
    .catch(err => {
      dispatch(changeMainLoadingStatus(false));
      dispatch(
        error({
          // uid: 'once-please', // you can specify your own uid if required
          title: 'Error',
          message:
            err && err.message
              ? err.message
              : 'Server Internall Error. Please try later !!!!',
          position: 'tr',
          autoDismiss: 10,
        }),
      );
      throw err;
    });
};
