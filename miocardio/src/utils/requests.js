
export function PostData(type, data){
    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_BASE_URL + type, {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8'
        }), 
        body: JSON.stringify(data)
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
  