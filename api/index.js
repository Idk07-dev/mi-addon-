const { getRouter } = require("stremio-addon-sdk");
const addonInterface = require("../addon");

const router = getRouter(addonInterface);

module.exports = (req, res) => {
    // Esto permite que Stremio se conecte desde cualquier dispositivo
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    router(req, res);
};
