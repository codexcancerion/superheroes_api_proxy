/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    console.warn('Missing "url" query parameter.'); // Warn about missing URL
    return new Response('Missing "url" query parameter.', {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  }

  console.log(`Proxying image from URL: ${imageUrl}`); // Log the image URL being proxied

  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    console.log('Successfully fetched image.'); // Log success
    return new Response(response.data, {
      headers: {
        'Content-Type': response.headers['content-type'],
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  } catch (error: any) {
    console.error('Error proxying image:', error.message); // Log the error message
    return new Response('Failed to fetch image.', {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  }
}