import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    game: 'chess-live',
    question: 'Play a real chess game on Chess.com.',
    title: 'Chess.com Live Game',
    playComputerUrl: 'https://www.chess.com/play/computer',
    playOnlineUrl: 'https://www.chess.com/play/online',
    options: [],
    answer: '',
  });
}
