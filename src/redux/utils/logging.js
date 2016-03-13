export function normal (message, data) {
  if (typeof data !== 'undefined') {
    console.log(message, data);
  } else {
    console.log(message);
  }
}

export function info (message, data) {
  if (typeof data !== 'undefined') {
    console.info(message, data);
  } else {
    console.info(message);
  }
}

export function warning (message) {
  console.warn(message);
}

export function error (message) {
  console.error(message);
}
