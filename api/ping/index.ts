import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Ping request received.');

    context.res = {
        body: "Pong"
    };

    context.log('Pong response sent.');
};

export default httpTrigger;