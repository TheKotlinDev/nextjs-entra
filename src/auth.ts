import NextAuth from 'next-auth';
import AzureAd from 'next-auth/providers/azure-ad';

import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const securedPage = nextUrl.pathname.startsWith('/secure');
      if (securedPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
  providers: [ AzureAd({
    clientId: process.env.AZURE_AD_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    tenantId: process.env.AZURE_AD_TENANT_ID,
    authorization: {
      params: {
        scope: 'openid profile email offline_access Presence.Read'
      }
    }
  }) ], // Add providers with an empty array for now
} satisfies NextAuthConfig;

export const { 
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth(authConfig);
