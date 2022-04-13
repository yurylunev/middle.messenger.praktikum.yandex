const express = require('express');
const fallback = require('express-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(`${__dirname}/dist`));
app.use('/static/', express.static(`${__dirname}/static`));
app.use(fallback('/', {root: `${__dirname}/dist`}));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
