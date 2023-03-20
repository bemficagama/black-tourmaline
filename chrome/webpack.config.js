const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        background: './src/scripts/background.js',
        login: './src/scripts/login.js',
        logout: './src/scripts/logout.js',
        opcoes: './src/scripts/opcoes.js',
        personalizar: './src/scripts/personalizar.js',
        preferencias: './src/scripts/preferencias.js',
        relatorio: './src/scripts/relatorio.js',
        status: './src/scripts/status.js',
        db: './src/scripts/dao/db.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/paginas/ajuda.html',
            inject: true,
            chunks: ['ajuda'],
            filename: 'ajuda.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/background.html',
            inject: true,
            chunks: ['background'],
            filename: 'background.html'
        }),
        
    ],

    output: {
        //filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};