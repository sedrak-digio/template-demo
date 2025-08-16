const { getDBContainer } = require("../utils/getDbClient");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // 1. Read the secret API key from the environment variables (Application Settings)
    const secretApiKey = process.env.MEMBERS_API_KEY;
    if (!secretApiKey) {
        context.log.error("Configuration error: MEMBERS_API_KEY is not set.");
        context.res = {
            status: 500,
            headers: { "Content-Type": 'application/json' },
            body: { error: "API Key is not configured on the server." }
        };
        return;
    }

    // 2. Get the API key from the request header
    const providedApiKey = req.headers['x-api-key'];

    // 3. Validate the API key
    if (!providedApiKey || providedApiKey !== secretApiKey) {
        context.log.warn("Unauthorized request: API key was missing or invalid.");
        context.res = {
            status: 401, // Unauthorized
            headers: { "Content-Type": 'application/json' },
            body: { error: "Unauthorized" }
        };
        return; // Stop execution
    }

    // --- If the key is valid, proceed with the original logic ---
    context.log("Authorized request received.");

    const hpId = req.query.hp || (req.body && req.body.hpId);

    const dbClient = await getDBContainer('Workshop', 'Members');
    const collectionList = (await dbClient.items.readAll().fetchAll()).resources;
    const membersRef = await dbClient.item(hpId || 'slack_cache');
    const { resource: members } = await membersRef.read();

    context.res = {
        headers: { "Content-Type": 'application/json' },
        body: { collectionList, members }
    };

}
