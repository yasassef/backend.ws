import express from "express";
import morgan from "morgan";
const app = express();

app.use(morgan('dev'));
app.use(express.json());

// request vai ter os dados enviados pelo cliente e 
//a res vai ser oq será respondido pro front

app.get('/test', (request, response) => { 
    return response.json({message: "Hello Word!!!"})
})

app.listen(3333, () => {
    console.log("Server started at port 3333!")
});