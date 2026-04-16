import { createGroq } from '@ai-sdk/groq';
import * as aiSdk from 'ai';
import { SYSTEM_PROMPT } from './prompt';

export const maxDuration = 30;

const groqApiKey = process.env.GROQ_API_KEY;

const groq = createGroq({
  apiKey: groqApiKey,
});

const MAX_MESSAGE_PAIRS = 4;
const MAX_CONTENT_CHARS = 700;

function errorHandler(error: unknown) {
  const rawMessage =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : error == null
          ? 'Unknown error'
          : JSON.stringify(error);

  const normalized = rawMessage.toLowerCase();
  const isForbiddenOrNoCredits =
    normalized.includes('forbidden') ||
    normalized.includes('does not have permission') ||
    normalized.includes("doesn't have any credits") ||
    normalized.includes('credits or licenses');

  if (isForbiddenOrNoCredits) {
    return 'Groq API access is currently blocked for this key/project. Check your key and project status at https://console.groq.com/.';
  }

  const isQuotaError =
    normalized.includes('quota exceeded') ||
    normalized.includes('resource_exhausted') ||
    normalized.includes('rate limit');

  if (isQuotaError) {
    return 'Groq API quota/rate-limit reached. Please wait and retry, or use a different free-tier key.';
  }

  return rawMessage;
}

function extractUserMessages(messages: any[]): Array<{ role: 'user'; content: string }> {
  return (messages || [])
    .filter((message) => message?.role === 'user')
    .map((message) => {
      const parts = Array.isArray(message?.parts) ? message.parts : [];
      const textFromParts = parts
        .filter((part: any) => part?.type === 'text' && typeof part?.text === 'string')
        .map((part: any) => part.text)
        .join('\n')
        .trim();

      const textFromContent =
        typeof message?.content === 'string' ? message.content.trim() : '';

      return {
        role: 'user' as const,
        content: textFromParts || textFromContent,
      };
    })
    .filter((message) => message.content.length > 0);
}

function extractText(message: any): string {
  const parts = Array.isArray(message?.parts) ? message.parts : [];
  const textFromParts = parts
    .filter((part: any) => part?.type === 'text' && typeof part?.text === 'string')
    .map((part: any) => part.text)
    .join('\n')
    .trim();

  const textFromContent =
    typeof message?.content === 'string' ? message.content.trim() : '';

  const normalized = (textFromParts || textFromContent).replace(/\s+/g, ' ').trim();
  return normalized.length > MAX_CONTENT_CHARS
    ? `${normalized.slice(0, MAX_CONTENT_CHARS)}...`
    : normalized;
}

function normalizeMessages(messages: any[]): Array<{ role: 'user' | 'assistant'; content: string }> {
  const normalized = (messages || [])
    .filter((message) => message?.role === 'user' || message?.role === 'assistant')
    .map((message) => ({
      role: message.role as 'user' | 'assistant',
      content: extractText(message),
    }))
    .filter((message) => message.content.length > 0);

  const deduped = normalized.filter((message, index) => {
    if (index === 0) return true;
    const previous = normalized[index - 1];
    const isDuplicateUserTurn =
      message.role === 'user' &&
      previous.role === 'user' &&
      previous.content === message.content;

    return !isDuplicateUserTurn;
  });

  // Keep only the most recent turns to avoid free-tier TPM spikes on Groq.
  return deduped.slice(-MAX_MESSAGE_PAIRS * 2);
}

export async function POST(req: Request) {
  try {
    if (!groqApiKey) {
      return new Response(
        'Missing API key: set GROQ_API_KEY in .env.local',
        { status: 500 }
      );
    }

    let requestBody: any;
    try {
      requestBody = await req.json();
    } catch {
      return new Response('Invalid JSON body', { status: 400 });
    }

    const messages = Array.isArray(requestBody?.messages)
      ? requestBody.messages
      : [];

    const fallbackMessages = normalizeMessages(messages);

    const modelMessages =
      fallbackMessages.length > 0
        ? fallbackMessages
        : extractUserMessages(messages);

    if (modelMessages.length === 0) {
      return new Response('No valid user messages found in request', { status: 400 });
    }

    const result = aiSdk.streamText({
      model: groq('llama-3.3-70b-versatile') as any,
      system: SYSTEM_PROMPT.content,
      messages: modelMessages,
      maxOutputTokens: 520,
      maxRetries: 2,
    });

    const streamResult = result as any;

    if (typeof streamResult.toUIMessageStreamResponse === 'function') {
      return streamResult.toUIMessageStreamResponse({
        onError: errorHandler,
      });
    }

    if (typeof streamResult.toDataStreamResponse === 'function') {
      return streamResult.toDataStreamResponse({
        getErrorMessage: errorHandler,
      });
    }

    return new Response('Unsupported AI SDK stream response method', { status: 500 });
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}
