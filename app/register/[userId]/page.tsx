import { useAuth } from "@/cotext/AuthContext";
import { auth, db } from "@/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import router from "next/navigation";

export default function Register() {
  const { user } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addDoc(collection(db, "Users"), {
      fname: formData.get("fname"),
      lanem: formData.get("lname"),
      email: formData.get("email"),
      phoneNumber: user?.phoneNumber,
      uid: user?.uid,
    });
  };
  const signOut = async () => {
    try {
      await auth.signOut().then(router.useRouter().back);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fname" placeholder="First Name" />
      <input type="text" name="lname" placeholder="Last Name" />
      <input type="email" name="email" placeholder="E-mail" />
      <button type="submit">Continue</button>
      <button onClick={signOut}>Cancel</button>
    </form>
  );
}
