/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

interface Params {
  token: string;
  name: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }): Promise<Response> {
  const { token, name } = params;
  const url = `https://superheroapi.com/api/${token}/search/${name}`;

  try {
    const response = await axios.get(url);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: any) {
    console.error(`Error searching for superhero with name: ${name} - ${error.message}`);
    return new Response('Error searching for superhero.', { status: 500 });
  }
}