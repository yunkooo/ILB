'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface Children {
    children: React.ReactNode;
}

export default function AuthSession({ children }: Children) {
    return <SessionProvider>{children}</SessionProvider>;
}
