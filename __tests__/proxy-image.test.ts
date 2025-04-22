import { GET } from '../app/api/proxy-image/route';

describe('Proxy Image API', () => {
  it('should return 400 if "url" query parameter is missing', async () => {
    const req = { url: 'http://localhost/api/proxy-image' } as any;
    const res = await GET(req);
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toBe('Missing "url" query parameter.');
  });

  it('should return 500 if the image URL is invalid', async () => {
    const req = { url: 'http://localhost/api/proxy-image?url=invalid-url' } as any;
    const res = await GET(req);
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toBe('Failed to fetch image.');
  });
});