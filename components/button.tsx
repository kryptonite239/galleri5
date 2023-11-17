"use client";

import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
const SignOut = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      await auth.signOut().then(() => router.push("/"));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button onClick={() => signOut()} className="text-sm font-light underline">
      Sign Out
    </button>
  );
};

export default SignOut;
