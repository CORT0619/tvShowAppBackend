import cookieParser from 'cookie-parser';
import app from './routes/routes'; // TODO: can this be better?

const PORT = process.env.PORT || 3000;

// middleware
app.use(cookieParser());

app.listen(PORT, () => {
	console.log('listening on PORT %d', PORT);
});