var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: './es6/main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: path.join(__dirname, 'es6'),
                loader: 'babel-loader'
            }, {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};

