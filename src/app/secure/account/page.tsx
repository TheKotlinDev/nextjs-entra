'use client'

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>
        Hello {session?.user?.name}
      </p>
      <p style={{marginBottom: '1rem'}}>
        Your email: {session?.user?.email}
      </p>

      <Button onClick={() => {
        signOut({
          callbackUrl: `http://${window.location.hostname}/`,
          redirect: true
        });
      }} variant="outlined" color="error">Logout</Button>
    </main>
  );
}
