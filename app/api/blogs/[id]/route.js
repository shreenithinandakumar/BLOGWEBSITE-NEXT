import blogs from '@/lib/blogs'

export let GET =  (req, {params}) => {
    try {
        let id = Number(params.id);
        console.log("id from params:", id);
        
        let blog = blogs.find(i=> i.id===id)
        console.log("blog found", blog);
        
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
        let id = Number(params.id);
        
        let blog = blogs.find(i=> i.id===id)
        
        if(!blog) {
            return Response.json({
                status: "bad request",
                message: "check id",
            }, {status:400})
        }

        const content = await req.json();
        let updatedBlog = {
            id: id, 
            ...content
        }
        console.log(updatedBlog);
        
        blogs[id-1] = updatedBlog;
        console.log("blogs[id]:  ", blogs[id]);
        console.log("blogs[id]-1:  ", blogs[id-1]);

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

export let DELETE = (req, {params}) => {
    try {
        let id = Number(params.id);
        
        let blog = blogs.find(i=> i.id===id)
        
        if(!blog) {
            return Response.json({
                status: "bad request",
                message: "check id",
            }, {status:400})
        }

        blogs.splice(id-1, 1);
        
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
