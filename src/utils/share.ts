import words from '@/data/words.json';

export function getLevelIndex(dateStr: string): number {
  const index = words.findIndex((w) => w.date === dateStr);
  return index !== -1 ? index + 1 : 1;
}

export function generateShareText(
  dateStr: string,
  guessColors: ('correct' | 'present' | 'absent')[][],
  guessesCount: number,
  isWin: boolean
): string {
  const levelIndex = getLevelIndex(dateStr);
  const guessSymbol = isWin ? `${guessesCount}` : 'X';

  const gridText = guessColors
    .map((row) =>
      row
        .map((color) => {
          if (color === 'correct') return '▓';
          if (color === 'present') return '▒';
          return '░';
        })
        .join(' ')
    )
    .join('\n');

  return `SAMMY NAILED IT! \n LILYPAD LEVEL ${levelIndex} [${guessSymbol}/6]\n${gridText}\n`;
}
