import type { Property } from './Property';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedProperties: Property[];
}
