import { WordleGame } from '@/components/WordleGame';
import { FloatingSprites } from '@/components/FloatingSprites';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full min-h-[100dvh] relative overflow-hidden bg-cozy-cream">
      <FloatingSprites />
      <div className="z-10 w-full flex justify-center items-center">
        <WordleGame />
      </div>
    </div>
  );
}
