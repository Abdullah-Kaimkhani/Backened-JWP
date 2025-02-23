import express from 'express'
const app = express()
console.log(app)
// const a = 10;
// const b = 10
// console.log(a + b)

// create server

app.listen(8000, ()=>{
    console.log('server is running on localhost:8000')
})



app.get("/user", (request, response)=>{
    response.send({
        name: "Abdullah Kaimkhani",
        age: 20,
        city: "Karachi"
    })
})

app.get("/", (request,response)=>{
    response.send("Server running on / ...")
})