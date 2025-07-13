import express from 'express';

const app = express();

app.get('/messages', (req, res) => {
  const requestSource = req.headers['x-id'];
  console.log(`${new Date().toISOString()}: << 실행중 >>/ ${requestSource} 에서 messages 요청`);
  res.json([
    {id: 1, text: 'Hello World'},
    {id: 2, text: 'Another message from the separate backend'},
  ]);
});
app.listen(8080);
