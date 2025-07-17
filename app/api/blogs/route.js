import blogs from '@/lib/blogs'

export let GET = async () => {
    try{
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
        const blog = await req.json();

        if(!blog.title || !blog.images || !blog.description || !blog.content || !blog.author || !blog.topPick) {
            return Response.json({
                status: "failed",
                message: "All fields are required"
            }, {status: 400})
        }

        const newBlog = {
            id: blogs.length + 1,
            ...blog,
        }

        blogs.push(newBlog);

        // const newProduct =  await ProductModel.create(products);
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
