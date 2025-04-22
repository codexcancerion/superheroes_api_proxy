/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ success: false, message: 'Missing "token" query parameter.' }), {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  }

  const testUrl = `https://superheroapi.com/api/${token}/1`;

  try {
    const response = await axios.get(testUrl);

    if (response.data && response.data.id) {
      return new Response(JSON.stringify({ success: true, message: 'Token is valid.' }), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow access from any origin
        },
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Token is invalid.' }), {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow access from any origin
        },
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: 'Error testing token.', error: error.message }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  }
}