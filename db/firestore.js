const admin = require('firebase-admin');

// setup firebase cloud store
const serviceAccount = require('../lib/key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
/**
 *
 * @param {*} an object containing the user's id
 * @param {*} firstName - user's firstName
 * @param {*} lastName - user's lastName
 */
async function createUser({ docKey, firstName, lastName }) {
  // create a new doc
  const docRef = await db.collection('users').doc(docKey);

  await docRef.set({ firstName: firstName, lastName: lastName})
      .then((response) => {
        return response;
      }).catch((error) => {
        return error;
      });
}

/**
 * 
 */
async function addEpisode() {

}

module.exports = createUser, addEpisode;
