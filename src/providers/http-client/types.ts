import { createHttpClient } from '@/providers/http-client/utils/create-http-client';

export type HttpClient = ReturnType<typeof createHttpClient>;
