const express = require('express');
require('../src/Controllers/user.js');
const app = express();
const PORT = 3000;


app.use('/auth',userrouter)
app.get('/', (req, res) => {
    res.send('<h1>Hello, World! This is an Express server!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
