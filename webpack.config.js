module.exports = {
    entry: './browser.js',
    output: {
        filename: 'build.js',
        path: '.'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
}