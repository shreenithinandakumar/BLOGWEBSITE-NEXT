// import blogs from '@/lib/blogs'
import { connectDB } from "@/lib/dbConnect"
import { BlogModel } from "@/models/blogModel"

export let GET = async () => {
    try{
        await connectDB();
        let blogs = await BlogModel.find()
        
        return Response.json({
            status: "success", 
            length: blogs.length,
            data: blogs
        }, {
            status: 200
        })
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}

export let POST = async (req) => {
    try{
        await connectDB();
        const body = await req.json();

        const newBlog =  await BlogModel.create(body);
        return Response.json({
            status: "success",
            message: {
                newBlog,
            }
        }, {status: 200})

    } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message
        }, {status: 500})
    }
}
