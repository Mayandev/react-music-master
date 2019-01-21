const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}


module.exports = function override(config, env) {
    // do stuff with the webpack config...

    //启用ES7的修改器语法（babel 7）
    config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { "legacy": true }], config)   //{ "legacy": true }一定不能掉，否则报错

    //配置别名
    config.resolve.alias = {
        '@': resolve('src')
    }


    return config;
};