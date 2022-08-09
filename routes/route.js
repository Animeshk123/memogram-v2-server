import express from 'express';
import {POSTS,CREATEPOST,POST,LIKE,COMMENT,GETCOMMENT,DASHBOARD} from '../middalware/index.js';
import {Post} from '../model/model.js';

const route = express.Router();

route.get("/posts",POSTS);
route.get('/post',POST);
route.post("/posts",CREATEPOST);
route.post('/like',LIKE);
route.post('/comment',COMMENT);
route.post('/delete/comment',GETCOMMENT);
route.get('/dashboard',DASHBOARD);


export default route;