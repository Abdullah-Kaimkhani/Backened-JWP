import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

const postModel = mongoose.model("post", schema)

export default postModel