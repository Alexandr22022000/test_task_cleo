const express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static('build'));

app.get('/*', (req, res) => {
    const stream = fs.createReadStream(path.resolve('build/index.html'));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    stream.pipe(res);
});

app.listen(app.get('port'), () => console.log('Server is started on port ' + app.get('port')));
