import { GET } from '../app/api/test/route';

describe('Token Test API', () => {
  it('should return 400 if the token is invalid', async () => {
    const req = { params: { token: 'invalid-token' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe('Token is invalid.');
  });

  it('should return 200 if the token is valid', async () => {
    const req = { params: { token: 'valid-token' } } as any;
    const res = await GET(req, { params: req.params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe('Token is valid.');
  });
});