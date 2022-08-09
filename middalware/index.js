import {Post} from '../model/model.js';
import { v4 as uuidv4 } from 'uuid';


export const POSTS = async (req,res) => {
  try{
   let data = await Post.find({});
   res.json({type:true,message:"ok",data:data});
  }
  catch(err){
    console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}

export const CREATEPOST = async (req,res) => {
  try{
      const {userId,profileUrl,name,post,description} = req.body;
      const newPost = new Post({
        user:{
          userId,
          profileUrl,
          name
        },
        description,
        post
      })
      await newPost.save();
      res.json({type:true,message:"ok",post:newPost});
  }
   catch(err){
    console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}


export const POST = async (req,res) => {
  try{
    let {q} = req.query;
    let post = await Post.findOne({_id:q});
    res.json({type:true,message:"ok",post})
  }
  catch(err){
     console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}

export const  LIKE = async (req,res) => {
  try{
    const {userId,postId} = req.body;
    let post = await Post.updateOne(
    { _id: postId }, 
    { $push: { likes: {likeId:uuidv4(),user:userId} } });
    res.json({status:true,message:"ok",post})
  }
  catch(err){
    console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}

export const COMMENT = async (req,res) => {
  try{
    const {author,text,postId} = req.body;
    let post = await Post.updateOne(
    { _id: postId }, 
    { $push: { comments: {commentId:uuidv4(),author,text} } },{new:true});
    res.json({status:true,message:"ok",post})
  }
  catch(err){
    console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}


export const GETCOMMENT = async (req,res) => {
  try{
    let {postId,commentId} = req.body;
    let post = await Post.findOne({_id:postId});
    let updatedComments = post.comments.filter(com => {
      if(com.commentId == commentId){
        return false;
      }
      return true;
    })
    
    let updatedPost = await Post.updateOne({_id:postId},{$set:{comments:updatedComments}},{new:true});
    res.json({status:true,message:"ok",updatedPost});
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}

export const DASHBOARD = async (req,res) => {
  try{
    let {user} = req.query;
    let posts = await Post.find({});
    let userPosts = posts.filter(post => {
      if(post.user.userId != user) return false;
      return true;
    })
    res.json({status:true,message:"ok",post:userPosts});
  }
  catch(err){
      console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}


export const DELETEPOST = async (req,res) => {
  try{
    let {id} = req.query;
    let post = await Post.deleteOne({_id:id});
    res.json({type:true,message:"ok",post});
  
  }
  catch(err){
    console.log(err);
    res.status(500).json({type:false,message:err.message});
  }
}
