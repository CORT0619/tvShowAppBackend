const firebase = require('firebase');
const createUser = require('../db/firestore');
const tvdbApi = require('./thetvdb-api');

/**
 * @return {object} status number and success/error message
 */
function accountRegistration() {
  const returnedRes = {};
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('response ', response);
        if (response) {
          addUser({ firstName, lastName })
              .then((result) => {
                if (result) {
                  returnedRes.status = 200;
                  returnedRes.msg = 'Account created successfully.';
                }
              })
              .catch((error) => {
                returnedRes.status = 500;
                returnedRes.error = error;
              });
        }
      })
      .catch((err) => {
        returnedRes.status = 500;
        returnedRes.error = err;
      });
  return returnedRes;
}

/**
 * @param {string} cookies containing the cookie for the tvdbApi
 * @param {string} email
 * @param {string} password
 * @return {Promise}
 */
function login(cookies, email, password) {
  return new Promise((resolve, reject) => {
    const returnedResponse = {};
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (response) => {
          // eslint-disable-next-line
          if (!cookies.token) { // TODO: Implement logic to check if token is also expired
            try {
              const token = await tvdbApi.tvShowLogin();
              console.log('token ', token);
              returnedResponse.token = token;
            } catch (e) {
              returnedResponse.status = 500;
              returnedResponse.msg = 'Unable to process your request';
            }
          }

          returnedResponse.status = 200;
          returnedResponse.msg = 'Login successful!';
          resolve(returnedResponse);
        })
        .catch((err) => {
          console.log('error ', err);
          returnedResponse.status = 400;
          returnedResponse.error = err.message;
          reject(returnedResponse);
        });
  });
}

/**
 * @param {*} firstName
 * @param {*} lastName
 */
async function addUser({ firstName, lastName }) {
  const firstInitial = firstName.charAt(0);
  const docKey = `${firstInitial.toLowerCase()}${lastName.toLowerCase()}`;
  const response = await createUser({ docKey, firstName, lastName });
  console.log(response);
}

module.exports = {
  accountRegistration,
  login,
  addUser
};

