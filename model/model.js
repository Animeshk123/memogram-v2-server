import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user:{
    userId:String,
    profileUrl:String,
    name:String
  },
  post:String,
  postType:String,
  type:String,
  description:{
    type:String,
    default:null
  },
 likes:{
   type:Array,
   default:[]
 },
 comments:{
   type:Array,
   default:[]
 },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

const Post =  mongoose.model("post",postSchema);
export {Post};