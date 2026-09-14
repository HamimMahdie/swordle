import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getWords() {
  const filePath = path.join(process.cwd(), 'src/data/words.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const beforeDate = searchParams.get('before');

    const words = getWords();

    // Only return entries with dates strictly before the given date (yesterday or earlier)
    const filtered = beforeDate
      ? words.filter((entry: any) => entry.date < beforeDate)
      : words;

    // Sort chronologically
    filtered.sort((a: any, b: any) => a.date.localeCompare(b.date));

    return NextResponse.json({ entries: filtered });
  } catch (error) {
    console.error('Error fetching vault data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
