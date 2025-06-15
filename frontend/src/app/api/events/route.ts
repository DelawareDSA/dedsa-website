import { promises as fs } from 'fs';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

interface ServiceAccount {
  client_email: string;
  private_key: string;
  type: string;
  project_id: string;
  private_key_id: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

export async function GET() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    console.error('GOOGLE_CALENDAR_ID is not set');
    return NextResponse.json({ error: 'Missing calendar ID' }, { status: 500 });
  }

  let serviceAccount: ServiceAccount;
  try {
    const credsPath = path.join(process.cwd(), 'src', 'googleService.json');
    const content = await fs.readFile(credsPath, 'utf8');
    serviceAccount = JSON.parse(content) as ServiceAccount;
  } catch (err) {
    console.error('Could not load googleService.json:', err);
    return NextResponse.json({ error: 'Credentials missing' }, { status: 500 });
  }

  try {
    const auth = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });
    const calendar = google.calendar({ version: 'v3', auth });

    const { data } = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });

    const events = data.items;

    return NextResponse.json(events);
  } catch (err) {
    console.error('Calendar API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
