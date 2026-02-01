const express = require('express');

const app = express();

// Dummy middleware
app.use((req, res, next) => {
    console.log('Dummy 1 ', req.url, req.method);
    next();
});
app.use((req, res, next) => {
    console.log('Dummy 2 ', req.url, req.method);
    next();
});

// app.use((req,res,next)=>{
//     res.send(`<h1>WELCOME TO THE HOME PAGE`);
// });



app.get('/', (req, res, next) => {
    console.log('Home Boss')
    res.send(`<h1>Home page</h1>`);
});
app.get('/contact-us', (req, res, next) => {
    console.log('Contact Boss');
    res.send(
        `<h1>Contact us</h1>
        <form action="/contact-us" method="POST">
        <input type="text" name="username" placeholder="Enter name">
        <input type="email" name="email" placeholder="Enter email">
        <input type="submit">
        </form>
        `
    );
});

app.post('/contact-us', (req, res, next) => {
    res.send(`success`);
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
})