import express from 'express'
import mongoose from 'mongoose'
import postModel from './postSchema.js';

const app = express();
// Middleware
app.use(express.json())


const PORT = 8080;
const DB_URL = "mongodb+srv://admin:admin@cluster0.uiacs.mongodb.net/";
mongoose.connect(DB_URL);

mongoose.connection.on('connected', ()=>{
    console.log("Database connected successfully...")
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
})





// POST API

app.get('/getpost', async(req, res)=>{
    try {
        const getData = await postModel.find({})
        res.status(200).json({
            message: "Get post successfully",
            getData
        })
    } catch (error){
        console.log(error)
    }
    res.send("Get Post")
})



app.post('/createpost', async(req, res)=>{

    try {
       const {title, desc} = req.body;
       if(!title || !desc){
        res.status(400).json({
            message: "required fields are missing"
        })
       }

       let obj = {
        title,
        desc
       }

       const saveData = await postModel.create(obj)
       res.status(200).json({
        message: "Data saved successfully",
        saveData
       })
       
    } catch (error) {
        console.log(error)
    }
    res.send("Create Post")
})



app.put('/updatepost', async(req, res)=>{

    try {
        const {postId, title, desc} = req.body;

        const updatedObj = {
            title,
            desc
        }

        const updateRes = await postModel.findByIdAndUpdate(postId, updatedObj);
        res.status(200).json({
            message: "Post updated successfully",
            updateRes
        })
    } catch (error) {
        console.log(error)
    }
    res.send("Update Post")
})



app.delete('/deletepost/:id', (req, res)=>{

    try {
        const {id} = req.params;
        const deleteObj = postModel.findOneAndDelete(id);
        res.status(200).json({
            message: "Post deleted successfully...",
            deleteObj
        })
    } catch (error) {
        console.log(error)
    }
    res.send("Delete Post")
})




app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`)
})