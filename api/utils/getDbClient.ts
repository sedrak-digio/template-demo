import { CosmosClient } from "@azure/cosmos";

const cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
});

async function getDBContainer(databaseId, containerId) {
    const database = (
        await cosmosClient.databases.createIfNotExists({
            id: process.env.COSMOS_ENV || databaseId,
        })
    ).database;

    const container = (
        await database.containers.createIfNotExists({
            id: containerId,
        })
    ).container;

    return container;
}

export default getDBContainer


/**
 * 
 * @returns An example method, that reads from a cosmos DB and incrememnts or creates a record in a container then increments the value
 */
export async function incrementExample() {

    const DATABASE_ID = 'Workshop';
    const CONTAINER_ID = 'Counters'
    const COUNTER_KEY = 'workshop-counter';

    const dbClient = await getDBContainer(DATABASE_ID, CONTAINER_ID);

    const countersRef = dbClient.item(COUNTER_KEY);

    const { resource: counter } = await countersRef.read();
    const counterValue = counter ? counter.counter + 1 : 1;

    if (counter) {
        await countersRef.replace({ id: COUNTER_KEY, counter: counterValue });
    } else {
        await dbClient.items.create({ id: COUNTER_KEY, counter: counterValue });
    }
    return counterValue;
}
