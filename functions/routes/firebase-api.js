const firebase = require('firebase');

/**
 * @return {object} status number and success/error message
 */
async function accountRegistration() {}

async function login(cookies, email, password) {
    const returnedResponse = {};
    const authResponse = await firebase.auth().signInWithEmailAndPassword(email, password);
    // implement jsonwebtoken

    try {
        const token = await 
    }
}

async function logout() {}

async function addUser({ firstName, lastName }) {}

module.exports = {
    accountRegistration,
    login,
    addUser,
    logout
};

