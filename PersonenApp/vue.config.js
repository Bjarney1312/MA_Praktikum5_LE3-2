module.exports = {
    devServer: {
        // This will forward any request that does not match a static file to localhost:3000
        proxy: {
            "^/api": {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws:true,
                logLevel: "debug"
            }
        }
    }
}