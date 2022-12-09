const awsLambdaFastify = require('@fastify/aws-lambda');
const init = require('./app');
const proxy = awsLambdaFastify(init());
exports.handler = async (event:any, context:any) => proxy(event, context);
