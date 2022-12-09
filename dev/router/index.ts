import { FastifyInstance } from 'fastify';

import gptController from '../controllers/gpt';;


export default async function router(fastify: FastifyInstance) {

    fastify.setErrorHandler((error, request, resp) => {
        const payload: any = {
        url: request.url,
        headers: request.headers,
        body: request.body,
    };

    request.log.error(payload, error.message);
    resp.send(error.message);
  });

  fastify.register(gptController, { prefix : '/gpt' });
    
}