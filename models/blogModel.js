import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'Admin',
    },
    content: {
        type: String,
        required: true,
    },
    topPick: {
        type: Boolean,
        default: false,
    },
})

export const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema)
