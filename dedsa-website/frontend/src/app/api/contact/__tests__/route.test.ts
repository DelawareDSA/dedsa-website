import { POST } from '../route';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('POST /api/contact', () => {
  const mockSendMail = jest.fn();
  const mockTransporter = { sendMail: mockSendMail };

  beforeEach(() => {
    jest.clearAllMocks();
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);
  });

  it('sends email with valid data', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      }),
    });

    mockSendMail.mockResolvedValue({ messageId: '123' });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'john@example.com',
      to: expect.any(String),
      subject: 'Test Subject',
      text: 'Test message',
    });
  });

  it('returns 400 for invalid email', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Invalid input' });
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('returns 400 for missing required fields', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        email: 'test@example.com',
        message: '',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('handles email service errors', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      }),
    });

    mockSendMail.mockRejectedValue(new Error('SMTP error'));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Internal server error' });
  });
});
