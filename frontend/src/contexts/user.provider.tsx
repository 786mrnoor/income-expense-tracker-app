import React, { useEffect, useState } from 'react';
import { authSchema, type AuthSchema } from '@/schemas/auth/auth.schema';
import { UserContext } from './user.context';
import { authFetch } from '@/lib/auth-fetch';


export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthSchema | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getUser() {
      try {
        const res = await authFetch({
          path: '/api/auth/me',
          method: 'GET',
          response: authSchema,
          signal: controller.signal
        });
        setUser(res);
      } catch (err) {
        console.error(err);
      }
    }
    getUser();

    return () => {
      controller.abort();
    };
  }, []);

  return <UserContext value={user}>{children}</UserContext>;
}