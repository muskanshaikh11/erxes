// @ts-ignore
import * as telemetry from 'erxes-telemetry';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import { sendRequest } from 'erxes-api-utils';
import { NextFunction, Request, Response } from 'express';
import { redis } from '../redis';

export default async function userMiddleware(req: Request & { user?: any }, _res: Response, next: NextFunction) {
  const erxesCoreToken = req.headers['erxes-core-token'];
  const url = req.headers['erxes-core-website-url'];

  if (erxesCoreToken && url) {
    try {
      const response = await sendRequest({
        url: 'https://erxes.io/check-website',
        method: 'POST',
        headers: {
          'erxes-core-token': erxesCoreToken
        },
        body: {
          url
        }
      });

      if (response === 'ok') {
        req.user = {
          _id: 'userId',
          customPermissions: [
            {
              action: 'showIntegrations',
              allowed: true,
              requiredActions: []
            },
            {
              action: 'showKnowledgeBase',
              allowed: true,
              requiredActions: []
            },
            {
              action: 'showScripts',
              allowed: true,
              requiredActions: []
            }
          ]
        };
      }
    } catch (e) {
      return next();
    }

    return next();
  }

  const token = req.cookies['auth-token'];

  if (!token) { return next(); }

  try {
    // verify user token and retrieve stored user information
    const { user }: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET || '');
    const validatedToken = await redis.get(`user_${token}`);
    
    // invalid token access.
    if (!validatedToken) {
      return next();
    }

    // save user in request
    req.user = user;
    req.user.loginToken = token;
    req.user.sessionCode = req.headers.sessioncode || '';

    const currentDate = new Date();
    const machineId: string = telemetry.getMachineId();

    const lastLoginDate = new Date(await redis.get(machineId) || '');

    if (lastLoginDate.getDay() !== currentDate.getDay()) {
      redis.set(machineId, currentDate.toJSON());

      telemetry.trackCli('last_login', { updatedAt: currentDate });
    }

    const hostname = await redis.get('hostname');

    if (!hostname) {
      redis.set('hostname', process.env.DOMAIN || 'http://localhost:3000');
    }
  } catch (e) {
    console.error(e);
  }


  return next();
};
