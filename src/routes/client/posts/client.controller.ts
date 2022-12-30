import * as express from 'express';
import Post from './post.interface';
import {loggerClient} from "../middlewares/logger";
class PostsController {
    public pathFa = '/client';
    public path = '/posts';
    public router = express.Router();

    private posts: Post[] = [
        {
            author: 'Marcin',
            content: 'Dolor sit amet',
            title: 'Lorem Ipsum',
        }
    ];

    constructor() {
        this.router.use(loggerClient)
        this.initRoutes();

    }

    public initRoutes() {

        this.router.get(`${this.pathFa}${this.path}` , this.getAllPosts);
        this.router.post(`${this.pathFa}${this.path}`, this.createAPost);

    }

    getAllPosts = (request: express.Request, response: express.Response) => {
        response.send(this.posts);
    }

    createAPost = (request: express.Request, response: express.Response) => {
        const post: Post = request.body;
        this.posts.push(post);
        response.send(post);
    }
}

export default PostsController;
