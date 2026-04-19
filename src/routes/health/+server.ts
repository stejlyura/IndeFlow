import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Health Check Endpoint (OPS-04).
 * Used by load balancers and monitoring tools (New Relic, AWS Route53) 
 * to verify that the application is running.
 */
export const GET: RequestHandler = async () => {
    return json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
    });
};
