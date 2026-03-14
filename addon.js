const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "org.pelis.villarrica",
    version: "1.0.0",
    name: "Pelis VIP",
    description: "Links de Pelispedia para Stremio",
    resources: ["stream"],
    types: ["movie"],
    catalogs: [],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler((args) => {
    // Por ahora devolvemos un link de prueba para verificar que funciona
    // Luego puedes expandirlo con el scraper real
    if (args.type === "movie") {
        return Promise.resolve({
            streams: [
                {
                    title: "Pelis VIP - Opción 1 (HD)",
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
            ]
        });
    } else {
        return Promise.resolve({ streams: [] });
    }
});

module.exports = builder.getInterface();
