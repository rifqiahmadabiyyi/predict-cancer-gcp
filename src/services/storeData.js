const { Firestore } = require('@google-cloud/firestore');
const serviceAccount = require('../../serviceAccount.json');
 
async function storeData(id, data) {
    const db = new Firestore(
        {
            databaseId: "(default)",
            projectId: serviceAccount.project_id,
            credentials: serviceAccount
        });
 
  const predictCollection = db.collection('prediction');
  return predictCollection.doc(id).set(data);
}
 
module.exports = storeData;