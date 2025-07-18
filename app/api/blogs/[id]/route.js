import { BlogModel } from '@/models/blogModel';
import { connectDB } from '@/lib/dbConnect';

export let GET =  async(req, {params}) => {
    try {
        await connectDB()
        const id  = params.id;

        if (!id) {
        return Response.json({
            status: "bad request",
            message: "Missing ID in request params",
        }, { status: 400 });
        }
        let blog = await BlogModel.findById(id);
        
        if(!blog) {
            return Response.json({
                status: "bad request",
                message: "check id",
            }, {status:400})
        }

        return Response.json({
            status: "success",
            data: blog
        }, {
            status: 200
        })
    } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}

export let PATCH = async(req, {params}) => {
    try {

        await connectDB()
        let id = params.id;
        const content = await req.json();
        
        let updatedBlog = await BlogModel.findByIdAndUpdate(id, content)
        if(!updatedBlog) {
            return Response.json({
                status: "bad request",
                message: "check id",
            }, {status:400})
        }

        
        // let updatedBlog = {
        //     id: id, 
        //     ...content
        // }
        // console.log(updatedBlog);
        
        // blogs[id-1] = updatedBlog;
        // console.log("blogs[id]:  ", blogs[id]);
        // console.log("blogs[id]-1:  ", blogs[id-1]);

        return Response.json({
            status: "success",
            data: updatedBlog
        }, {
            status: 200
        })
    } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}

export let DELETE = async (req, {params}) => {
    try {

        await connectDB();
        let id = params.id;
        
        // let blog = blogs.find(i=> i.id===id)
        
        let blog = await BlogModel.findByIdAndDelete(id);

        if(!blog) {
            return Response.json({
                status: "bad request",
                message: "check id",
            }, {status:400})
        }

        // blogs.splice(id-1, 1);
        
        return Response.json({
            status: "deleted successfully",
            data: blog
        }, {
            status: 200
        })
    } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}
