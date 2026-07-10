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
    const date = searchParams.get('date');

    const targetDate = date || new Date().toISOString().split('T')[0];
    const words = getWords();
    const dailyEntry = words.find((entry: any) => entry.date === targetDate) || words[0];

    return NextResponse.json({
      affirmation: dailyEntry.affirmation,
      targetWord: dailyEntry.word.toUpperCase(),
    });
  } catch (error) {
    console.error('Error fetching daily affirmation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
