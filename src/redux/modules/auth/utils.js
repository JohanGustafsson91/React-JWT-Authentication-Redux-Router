//////////////////////////////////
// Authentication helper utils  //
//////////////////////////////////


/**
* @param  {[object]} credentials
* @author Johan Gustafsson <johan.gustafsson@solidio.se>
*/
export function updateAuthenticationCredentials (response) {
  if (response.hasOwnProperty('auth')) {
    let credentials = {};
    credentials.token = response.auth.token;

    if (response.auth.hasOwnProperty('code')) {
      // Update with new
      credentials.id = response.auth.id;
      credentials.code = response.auth.code;
    } else {
      // Use current
      let auth = JSON.parse(localStorage.getItem('auth'));
      if (auth !== null && auth.hasOwnProperty('code')) {
        credentials.id = auth.id;
        credentials.code = auth.code;
      }
    }

    localStorage.setItem('auth', JSON.stringify(credentials));
  }
}

/**
* @author Johan Gustafsson <johan.gustafsson@solidio.se>
*/
export function getHeaders () {
  try {
    let auth = JSON.parse(localStorage.getItem('auth'));
    if (auth !== null) {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': auth.token || null,
        'x-access-id': auth.id || null,
        'x-access-code': auth.code || null
      };
    }
  } catch (e) {}

  // Return without access credentials if not saved in local storage.
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
}

export function removeToken () {
  console.log('removeToken');
  localStorage.removeItem('auth');
}
