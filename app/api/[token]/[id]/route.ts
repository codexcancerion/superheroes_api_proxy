/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string; id: string }> }): Promise<Response> {
  const { token, id } = await params; // Await the params to extract token and id

  const url = `https://superheroapi.com/api/${token}/${id}`;

  try {
    const response = await axios.get(url);

    if (!response.data || !response.data.id) {
      return new Response('Superhero not found', {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow access from any origin
        },
      });
    }

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  } catch (error: any) {
    console.error(`Error fetching superhero with ID: ${id} - ${error.message}`); // Log the error message
    console.debug('Error details:', error); // Log detailed error information
    return new Response('Error fetching data from the SuperHero API', {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow access from any origin
      },
    });
  }
}