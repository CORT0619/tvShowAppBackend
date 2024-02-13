import app from './routes'; // TODO: can this be better?

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listening on PORT %d', PORT);
});
