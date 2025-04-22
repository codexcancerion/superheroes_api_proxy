import { GET } from '../app/api/[token]/range/[startId]/[endId]/route';

describe('Range Superhero API', () => {
  it('should return 200 with an empty array if no superheroes are found', async () => {
    const req = { params: { token: 'invalid-token', startId: '1000', endId: '1001' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual([]);
  });

  it('should return 200 with superhero data if found', async () => {
    const req = { params: { token: 'valid-token', startId: '1', endId: '2' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.length).toBeGreaterThan(0);
  });
});