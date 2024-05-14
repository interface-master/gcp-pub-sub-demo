const functions = require('@google-cloud/functions-framework');

const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'pubsub-demo-202405';
const COLLECTION_POINTS = 'points';

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true
  // NOTE: Don't hardcode your project credentials here.
  // If you have to, export the following to your shell:
  //   GOOGLE_APPLICATION_CREDENTIALS=<path>
  // keyFilename: '/cred/cloud-functions-firestore-000000000000.json',
});

// recieves coordinates from the Web UI
functions.cloudEvent('log', cloudEvent => {

  const points = JSON.parse(atob(cloudEvent.data.message.data)).points;

  const response = {
    status: 0,
    message: "",
  }

  try {
    const docRef = firestore.collection(COLLECTION_POINTS).doc();
    docRef.set({ points });

    response.status = 200;
    response.message = 'Logged ok';
  } catch (error) {
    console.error('Error storing points: ', error);
    
    response.status = 500;
    response.message = 'Logged error';
  }

  return response;
});
