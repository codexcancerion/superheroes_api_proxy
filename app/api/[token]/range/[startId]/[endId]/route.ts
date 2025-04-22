/* eslint-disable */

import axios from 'axios';
import { NextRequest } from 'next/server';

interface Params {
  token: string;
  startId: string;
  endId: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }): Promise<Response> {
  const { token, startId, endId } = params;
  let heroes: any[] = [];

  for (let id = parseInt(startId); id <= parseInt(endId); id++) {
    const url = `https://superheroapi.com/api/${token}/${id}`;
    try {
      const response = await axios.get(url);
      heroes.push(response.data);
    } catch (error: any) {
      console.error(`Error fetching superhero with ID: ${id} - ${error.message}`);
    }
  }

  return new Response(JSON.stringify(heroes), { status: 200 });
}