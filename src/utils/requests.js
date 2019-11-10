import Auth from './Auth';

export function makeCancelable (promise) {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export function PostData(type, data){
    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_BASE_URL + type, {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': Auth.isUserAuthenticated() ? Auth.getToken() : false,
        }), 
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        resolve(responseJSON);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
  

  
export function GetData(type){
  return new Promise((resolve, reject) => {
    fetch(process.env.REACT_APP_BASE_URL + type, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': Auth.isUserAuthenticated() ? Auth.getToken() : false,
      }),
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      resolve(responseJSON);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}
