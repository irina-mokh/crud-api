import { ServerResponse } from 'http';

export const sendRes = (res: ServerResponse, code: number, data: unknown) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code;
  res.end(JSON.stringify(data));
};

