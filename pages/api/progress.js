let clients = [];

export default function handler(req, res) {
if (req.method === "GET") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    clients.push(res);

    req.on("close", () => {
    clients = clients.filter((client) => client !== res);
    });
} else {
    res.status(405).json({ error: "Method not allowed" });
}
}

// 진행률 업데이트 함수
export const sendProgress = (progress) => {
clients.forEach((client) =>
    client.write(`data: ${JSON.stringify(progress)}\n\n`)
);
};
