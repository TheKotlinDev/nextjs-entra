import { auth } from "@/auth";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
// import { useSession } from "next-auth/react";

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {session && (
        <>
          <Typography 
            variant='h2' 
            sx={{
              fontSize: '1.7rem',
            }}
          >
            Welcome back {session.user?.name}
          </Typography>
        </>
      )}
      {!session && (
        <>
          <p style={{marginBottom: '1rem'}}>
            To use this website, you must login
          </p>
          <Button href='/secure/account' variant="outlined">Login</Button>
        </>
      )}
    </main>
  );
}
