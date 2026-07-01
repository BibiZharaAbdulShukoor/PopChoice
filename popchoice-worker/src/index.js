const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request) {
		// Handle CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: corsHeaders,
			});
		}

		// Handle POST request (from React)
		if (request.method === 'POST') {
			const body = await request.json();

			const data = {
				movie: {
					title: 'Inception',
					release_year: '2010',
					content: 'A thief enters dreams to steal secrets.',
				},
				explanation: 'Based on your mood and preferences, this movie matches your taste.',
			};

			return new Response(JSON.stringify(data), {
				headers: {
					...corsHeaders,
					'Content-Type': 'application/json',
				},
			});
		}

		// Handle GET request (browser test)
		return new Response(JSON.stringify({ status: 'Worker is running' }), {
			headers: {
				...corsHeaders,
				'Content-Type': 'application/json',
			},
		});
	},
};
