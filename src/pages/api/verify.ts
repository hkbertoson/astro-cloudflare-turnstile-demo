import type {APIRoute} from 'astro';
const verifyEndpoint =
	'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/*
 * This is the API route that will be called when the form is submitted.
 * Secret Key stored in your .env file for security reasons.
 *
 */
const secretKey = '1x0000000000000000000000000000000AA';

export const prerender = false;

export const POST: APIRoute = async ({request}) => {
	const {token} = (await request.json()) as {token: string};
	const response = await fetch(verifyEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `secret=${encodeURIComponent(
			secretKey
		)}&response=${encodeURIComponent(token)}`,
	});

	const data = await response.json();
	return new Response(JSON.stringify(data), {status: response.status});
};
