const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(`${__dirname}/dist`));
app.use('/static/', express.static(`${__dirname}/static`));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
