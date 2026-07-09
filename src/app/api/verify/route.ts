import { NextRequest, NextResponse } from 'next/server';
import { isValidWord } from '@/data/dictionary';
import fs from 'fs';
import path from 'path';

interface VerifyRequestBody {
  guess?: string;
  date?: string; // YYYY-MM-DD local date of the user
}

function getWords() {
  const filePath = path.join(process.cwd(), 'src/data/words.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyRequestBody = await req.json();
    const { guess, date } = body;

    if (!guess || typeof guess !== 'string' || guess.length !== 5) {
      return NextResponse.json(
        { isValid: false, error: 'Guess must be exactly 5 letters long.' },
        { status: 400 }
      );
    }

    const cleanGuess = guess.toUpperCase();

    // Check if it's a valid alphabetical word
    if (!/^[A-Z]{5}$/.test(cleanGuess)) {
      return NextResponse.json(
        { isValid: false, error: 'Guess must contain letters only.' },
        { status: 400 }
      );
    }

    // Check against standard dictionary
    if (!isValidWord(cleanGuess)) {
      return NextResponse.json(
        { isValid: false, error: 'Not in word list.' },
        { status: 200 } // Return 200 with isValid: false so client can handle word shake
      );
    }

    // Find the daily word for the requested date
    // Fallback to today's date if not provided, or fallback to the first word if date is not found
    const targetDate = date || new Date().toISOString().split('T')[0];
    const words = getWords();
    const dailyEntry = words.find((entry: any) => entry.date === targetDate) || words[0];
    const targetWord = dailyEntry.word.toUpperCase();

    // Wordle comparison algorithm
    const targetLetters = targetWord.split('');
    const guessLetters = cleanGuess.split('');
    const colors = Array(5).fill('absent');
    const targetUsed = Array(5).fill(false);
    const guessUsed = Array(5).fill(false);

    // First pass: identify exact matches (correct position)
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        colors[i] = 'correct';
        targetUsed[i] = true;
        guessUsed[i] = true;
      }
    }

    // Second pass: identify partial matches (correct letter, wrong position)
    for (let i = 0; i < 5; i++) {
      if (guessUsed[i]) continue;
      for (let j = 0; j < 5; j++) {
        if (!targetUsed[j] && guessLetters[i] === targetLetters[j]) {
          colors[i] = 'present';
          targetUsed[j] = true;
          break;
        }
      }
    }

    const isWin = cleanGuess === targetWord;

    return NextResponse.json({
      isValid: true,
      isWin,
      colors,
    });
  } catch (error) {
    console.error('Error verifying guess:', error);
    return NextResponse.json(
      { isValid: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
