"use client";
import { useAuth } from "@/cotext/AuthContext";
import { auth, db } from "@/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Register() {
  const { user } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addDoc(collection(db, "Users"), {
      fname: formData.get("fname"),
      lanem: formData.get("lname"),
      email: formData.get("email"),
      phoneNumber: user?.phoneNumber,
      uid: user?.uid,
      links: [],
    });
    router.push(`/user/${user?.uid}`);
  };
  const signOut = async () => {
    try {
      await auth.signOut().then(() => {
        router.push("/");
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col items-center justify-center gap-3 px-3"
    >
      <h1 className="text-xl lg:text-3xl">Register To Use LinkFolio</h1>
      <Input
        type="text"
        name="fname"
        placeholder="First Name"
        className="w-full md:w-1/2 lg:w-1/3"
      />
      <Input
        type="text"
        name="lname"
        placeholder="Last Name"
        className="w-full md:w-1/2 lg:w-1/3"
      />
      <Input
        type="email"
        name="email"
        placeholder="E-mail"
        className="w-full md:w-1/2 lg:w-1/3"
      />
      <Button type="submit" className="w-full md:w-1/2 lg:w-1/3">
        Continue
      </Button>
      <Button
        type="submit"
        className="w-full md:w-1/2 lg:w-1/3"
        variant={"destructive"}
        onClick={() => signOut()}
      >
        Cancel
      </Button>
    </form>
  );
}
