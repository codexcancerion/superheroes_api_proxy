/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string; name: string }> }): Promise<Response> {
  const { token, name } = await params; // Await the params to extract token and name
  const url = `https://superheroapi.com/api/${token}/search/${name}`;

  try {
    const response = await axios.get(url);
    
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  } catch (error: any) {
    console.error(`Error searching for superhero with name: ${name} - ${error.message}`); // Log the error message
    return new Response('Error searching for superhero.', {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  }
}