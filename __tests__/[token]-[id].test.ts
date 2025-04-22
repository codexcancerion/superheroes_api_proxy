import { GET } from '../app/api/[token]/[id]/route';

describe('Get Superhero by ID API', () => {
  it('should return 404 if superhero is not found', async () => {
    const req = { params: { token: 'invalid-token', id: '999999' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).toBe('Superhero not found');
  });

  it('should return 200 with superhero data if found', async () => {
    const req = { params: { token: 'valid-token', id: '1' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('id', '1');
  });
});