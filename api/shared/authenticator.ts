import * as jwt from 'jwt-simple';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';

const secret: string = process.env.HASH_SECRET;

export class Authenticator {
  public static issueToken(userId: Guid): string {
    const issueTime: moment.Moment = moment.utc();

    const payload = {
      userId: userId.toString(),
      issued: issueTime.unix(),
      expiry: issueTime.add(1, "year").unix()
    };

    return jwt.encode(payload, secret);
  }

  public static isTokenValid(token: string) {
    const payload = jwt.decode(token, secret);
    const expiry: moment.Moment = moment.unix(payload.expiry).utc();

    return expiry.isBefore(moment().utc());
  }

  public static authenticateUser(username: string, passwordHash: string): Guid {
    return Guid.create();
  }
}