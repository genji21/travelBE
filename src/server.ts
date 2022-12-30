import App from './app';
import PostsController from './routes/client/posts/client.controller';

const app = new App(
    [
        new PostsController(),
    ],
    5000,
);

app.listen();
