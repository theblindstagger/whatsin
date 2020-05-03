import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Authenticator } from "../shared/authenticator";
import { Guid } from "guid-typescript";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    if (!req.body || !req.body.username || !req.body.passwordHash) {
        context.res = {
            status: 400,
            body: {
                isAuthenticated: false,
                error: "Invalid request"
            }
        };

        return;
    }

    const userId: Guid = Authenticator.authenticateUser(req.body.username, req.body.passwordHash);
    const token: string = Authenticator.issueToken(userId);

    context.res = {
        body: {
            isAuthenticated: true,
            token: token
        },
        headers: {
            'Authorization': token
        }
    };

};

export default httpTrigger;