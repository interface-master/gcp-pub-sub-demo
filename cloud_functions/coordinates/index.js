const functions = require('@google-cloud/functions-framework');
const { PubSub } = require('@google-cloud/pubsub');

functions.http('coordinates', (req, res) => {

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  
  } else if (req.method === 'POST') {
    const points = req.body;

    const pubsubClient = new PubSub();
    const topic = pubsubClient.topic('coordinates');
    
    try {
      const dataString = JSON.stringify(points);
      const messageBuffer = Buffer.from(dataString, 'utf-8');
      topic.publishMessage({data: messageBuffer});
      res.status(200).send('Points published');
    } catch (error) {
      console.error('Error publishing messages:', error);
      res.status(500).send('Error publishing points!');
    }
  }
});
