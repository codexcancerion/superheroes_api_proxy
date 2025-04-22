/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing "url" query parameter.', { status: 400 });
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    return new Response(response.data, {
      headers: {
        'Content-Type': response.headers['content-type'],
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('Error proxying image:', error.message);
    return new Response('Failed to fetch image.', { status: 500 });
  }
}