/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  console.log('Incoming request:', req.url); // Log the incoming request URL

  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    console.warn('Missing "token" query parameter.'); // Warn about missing token
    return new Response(JSON.stringify({ success: false, message: 'Missing "token" query parameter.' }), { status: 400 });
  }

  console.log('Testing token:', token); // Log the token being tested
  const testUrl = `https://superheroapi.com/api/${token}/1`;
  console.log('Test URL:', testUrl); // Log the URL being called

  try {
    const response = await axios.get(testUrl);
    console.log('Response from SuperHero API:', response.data); // Log the response data

    if (response.data && response.data.id) {
      console.info('Token is valid.'); // Log success for a valid token
      return new Response(JSON.stringify({ success: true, message: 'Token is valid.' }), { status: 200 });
    } else {
      console.warn('Token is invalid.'); // Warn about an invalid token
      return new Response(JSON.stringify({ success: false, message: 'Token is invalid.' }), { status: 400 });
    }
  } catch (error: any) {
    console.error('Error testing token:', error.message); // Log the error message
    console.debug('Error details:', error); // Log detailed error information
    return new Response(JSON.stringify({ success: false, message: 'Error testing token.', error: error.message }), { status: 500 });
  }
}