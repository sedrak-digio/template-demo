const { getDBContainer } = require("../utils/getDbClient");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const hpId = req.query.hp || (req.body && req.body.hpId);

    const dbClient = await getDBContainer('HP', 'Members');
    const collectionList = (await dbClient.items.readAll().fetchAll()).resources;
    const membersRef = await dbClient.item(hpId || 'slack_cache');
    const { resource: members } = await membersRef.read();

    context.res = {
        headers: { "Content-Type": 'application/json' },
        body: { collectionList, members }
    };

}
