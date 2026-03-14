const { addonBuilder } = require("stremio-addon-sdk");
const axios = require("axios");
const cheerio = require("cheerio");

const manifest = {
    id: "org.pelis.villarrica",
    version: "1.0.0",
    name: "Pelis VIP",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async (args) => {
    try {
        const urlBusqueda = "https://www.pelispedia.mov/?s=" + args.id;
        const response = await axios.get(urlBusqueda, {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" }
        });
        const $ = cheerio.load(response.data);
        const link = $(".poster a").first().attr("href");

        if (!link) return { streams: [] };

        const resPost = await axios.get(link);
        const $$ = cheerio.load(resPost.data);
        const results = [];

        $$("iframe").each((i, el) => {
            let src = $$(el).attr("src");
            if (src) {
                results.push({
                    title: "Opción " + (i + 1),
                    url: src.startsWith("//") ? "https:" + src : src
                });
            }
        });

        return { streams: results };
    } catch (e) {
        return { streams: [] };
    }
});

module.exports = builder.getInterface();