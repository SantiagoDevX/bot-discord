import { readFileSync, writeFileSync } from "node:fs";
import { config } from "../config.js";
// Cargar datos
const { access_token, open_id } = config.tiktok;
const fetch = global.fetch || (await import("node-fetch")).default;
// Leer el último video conocido
function getLastVideoId() {
    try {
        const data = JSON.parse(readFileSync("./data.json").toString());
        return data.lastVideoId;
    }
    catch {
        return null;
    }
}
// Guardar el último video nuevo
function saveLastVideoId(id) {
    writeFileSync("./data.json", JSON.stringify({ lastVideoId: id }, null, 2));
}
// Verificar si hay videos nuevos
async function checkVideos() {
    try {
        const res = await fetch("https://open.tiktokapis.com/v2/video/list/?fields=id,title,create_time,share_url", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                open_id: open_id,
                max_count: 1,
                cursor: 0,
            }),
        });
        const data = await res.json();
        const video = data?.data?.videos?.[0];
        if (!video) {
            console.log("⚠️ No se encontraron videos.");
            return;
        }
        const lastId = getLastVideoId();
        if (video.id !== lastId) {
            console.log("🎉 ¡Nuevo video detectado!");
            console.log(`🆕 Título: ${video.title}`);
            console.log(`🔗 Enlace: ${video.share_url}`);
            saveLastVideoId(video.id);
        }
        else {
            console.log("🕒 No hay videos nuevos.");
        }
    }
    catch (error) {
        console.error("Error al verificar videos:", error);
    }
}
// Iniciar bucle
console.log("⏳ Iniciando monitor de TikTok...");
checkVideos();
setInterval(checkVideos, 5 * 60 * 1000); // cada 5 minutos
