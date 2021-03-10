const cart = require('./cart');
const fs = require('fs');

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            res.send({ result: 0, text: 'error' });
            return;
        }

        let newCart = cart[action](JSON.parse(data), req);
        fs.writeFile(file, newCart, (err) => {
            if (err) {
                res.send({ result: 0, text: 'error' });
                return;
            }

            res.send({ result: 1, text: 'error' })
        })
    })
};

module.exports = handler;