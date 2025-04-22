/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

interface Params {
  token: string;
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }): Promise<Response> {
  const { token, id } = params;

  console.log(`Incoming request for superhero with ID: ${id}`); // Log the superhero ID
  console.log(`Using token: ${token}`); // Log the token being used

  const url = `https://superheroapi.com/api/${token}/${id}`;
  console.log(`Fetching data from URL: ${url}`); // Log the API URL being called

  try {
    const response = await axios.get(url);
    console.log(`Response from SuperHero API:`, response.data); // Log the response data

    if (!response.data || !response.data.id) {
      console.warn(`Superhero with ID: ${id} not found.`); // Warn if superhero is not found
      return new Response('Superhero not found', { status: 404 });
    }

    console.info(`Superhero with ID: ${id} found successfully.`); // Log success
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: any) {
    console.error(`Error fetching superhero with ID: ${id} - ${error.message}`); // Log the error message
    console.debug('Error details:', error); // Log detailed error information
    return new Response('Error fetching data from the SuperHero API', { status: 500 });
  }
}