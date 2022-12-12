/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return await handleRequest(request);
	},
};

async function handleRequest(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
    };
  const clientIP = request.headers.get('CF-Connecting-IP');

  if (request.cf ) {
    var clientASN = request.cf.asn
    var clientCountry = request.cf.country
  }
  if (clientCountry != null && clientCountry != "SG") {
    

    return new Response("redirect",{status: 200, headers: headers});

  } 
  return new Response("This is your IP " + clientIP + " and you are accessing this site from "+ clientCountry + "|" + clientASN,{status: 200, headers: headers})
}

