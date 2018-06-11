const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/bundle.js"
    },
    devServer: {
        contentBase: './app'
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            settingAction:'app/js/action/settingAction.js',
            textChatAction:'app/js/action/textChatAction.js',
            userOnlineAction: 'app/js/action/userOnlineAction.js',
            videoConnectingStatusAction: 'app/js/action/videoConnectingStatusAction.js',
            onlineListDisplayAction: 'app/js/action/onlineListAction.js',

            ownerVideoStatus:'app/js/action/ownerVideoStatus.js',
            ownerVideoStatusState: 'app/js/reducer/ownerVideoStatusState.js',
            getUserMedia:'app/js/webrtc/getUserMedia.js',
            iceServer: 'app/js/webrtc/iceServer.js',
            myPeer: 'app/js/webrtc/simplePeer.js',
            socketIoClient: 'app/js/webrtc/socketIoClient.js',
            config: 'app/js/config/config.js',

        },
        extensions: ['*','.js','.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','stage-0']
                    }
                }
            }
            ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin("css/bundle.css"),
        // new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/index.html',
            // minify: {
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true
            // }
        }),
        new HtmlWebpackPlugin({
            filename: 'chatting.html',
            template: 'app/chatting.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'close-chat-list.html',
            template: 'app/close-chat-list.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'connecting.html',
            template: 'app/connecting.html',
        }),

        new CopyWebpackPlugin([{from: './app/icon', to: './icon'}])
    ]
};