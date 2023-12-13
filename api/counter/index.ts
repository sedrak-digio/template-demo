import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { incrementExample } from "../utils/getDbClient";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const response: { [key: string]: any } = { responseMessage }
    try {
        const cosmosCounter = await incrementExample()
        response.counterValue = cosmosCounter
    } catch (e) {
        response.error = "Error fecthing counter from cosmos table, remember to create the DB and set the connection string"
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response 
    };

};

export default httpTrigger;