const functions = require('@google-cloud/functions-framework');
const { PubSub } = require('@google-cloud/pubsub');

functions.http('coordinates', async (req, res) => {
  const points = req.body;

  const pubsubClient = new PubSub();
  const topic = pubsubClient.topic('coordinates');
  
  try {
    const dataString = JSON.stringify(points);
    const messageBuffer = Buffer.from(dataString, 'utf-8');
    await topic.publish(messageBuffer);
    res.status(200).send('Points published successfully!');
  } catch (error) {
    console.error('Error publishing messages:', error);
    res.status(500).send('Error publishing points!');
  }
});
