import { GET } from '../app/api/[token]/search/[name]/route';

describe('Search Superhero API', () => {
  it('should return 500 if the search fails', async () => {
    const req = { params: { token: 'invalid-token', name: 'batman' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toBe('Error searching for superhero.');
  });

  it('should return 200 with superhero data if found', async () => {
    const req = { params: { token: 'valid-token', name: 'batman' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('results');
  });
});