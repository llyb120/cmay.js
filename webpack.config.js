var webpack = require("webpack");
var path = require("path");

var production = false;

module.exports = {
    plugins: production ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
    ] : [],
    entry: {
        cmay : ['./src/cmay/main.js'],
    },
    output: {
        path: path.join(__dirname, ''),  //设置打包后的js的输出位置
        filename: "[name].js",  //和入口文件的名字相同
        publicPath: "./"  //浏览器会从这个目录开始查找模块
    },
    resolve: {
        extensions: ['.js'],
        alias: {  //注册模块，以后用的时候可以直接requier("模块名")
            // cookie: path.join(__dirname,"./static/js/jquery.cookie.js"),
            // jquery: path.join(__dirname,"./static/js/jquery.min.js"),
            // header: path.join(__dirname,"./static/js/app/src/common/header.js"),
            // leftMenu: path.join(__dirname,"./static/js/app/src/common/leftMenu.js"),
            // util: path.join(__dirname,"./static/js/app/src/common/util.js"),
            // logout: path.join(__dirname,"./static/js/app/src/common/logout.js"),
            // AJAXService: path.join(__dirname,"./static/js/app/src/common/AJAXService.js"),
            // laydate: path.join(__dirname,"./static/js/lib/laydate/laydate.js"),
            // accommodationPriceList: path.join(__dirname,"./static/js/app/src/price/accommodationPriceList.js"),
            // virtualDOM: path.join(__dirname,"./static/js/app/src/common/virtualDOM.js"),
            // trToggle: path.join(__dirname,"./static/js/app/src/common/trToggle.js")
        }
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: [['es2015']],
                    plugins : [
                        "transform-es3-property-literals",
                        "transform-es3-member-expression-literals",
                        "transform-es2015-modules-simple-commonjs",
                        ['transform-es2015-classes',{loose: true}],
                        "transform-remove-strict-mode"

                    //     ['transform-strict-mode',{"strict": false}]
                    ]
                }
            }
        ]
    },
    //devtool: "sourcemap",  //生成用来调试的map,
};