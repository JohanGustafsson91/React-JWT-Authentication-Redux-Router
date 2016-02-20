/**
* Function that checks the http request.
* @param  {[type]} response [response from request]
* @return {[type]}          [response if success, else an error is thrown]
*/
export function checkHttpStatus (response) {
  console.log('checkHttpStatus: ', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.status + " " + response.statusText);
    error.response = response;
    throw error;
  }
}
