export async function GET(){
    return Response.json({message: "Success", data:20})
}

export async function POST(req) {
    const {name, price} = await req.json()
    return Response.json({
        status: "success",
        data: {
            n: name,
            p: price
        }
    })
}