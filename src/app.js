const express = require('express');
const app = express();
const taskRouter = require('./routes/routers');

app.use(express.json());
app.use('/api', taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto  ${PORT}`);
});
