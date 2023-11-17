"use server";
import { db } from "@/firebase.config";
import { v4 as uuidv4 } from "uuid";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { User } from "./types";

export async function getLinks(id: string) {
  const docRef = doc(db, "Users", id);
  const user = await getDoc(docRef);
  if (user.exists()) {
    return NextResponse.json({ links: user.data().links });
  } else return NextResponse.json({ links: null });
}
export async function getUser(uid: any) {
  let user: User | [] = [];
  let id = null;
  const q = query(collection(db, "Users"), where("uid", "==", uid));
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    user = doc.data() as User;
    id = doc.id;
  });
  if (user != null) {
    return NextResponse.json({ user, id });
  }
  return NextResponse.json({ user: null });
}
export async function addLink(formData: FormData) {
  const userRef = doc(db, "Users", `${formData.get("id")}`);
  await updateDoc(userRef, {
    links: arrayUnion({
      link_id: uuidv4(),
      title: formData.get("title"),
      url: formData.get("url"),
    }),
  });
  revalidatePath(`/user/${formData.get("uid")}`);
}
export async function deleteLink(formData: FormData) {
  const userRef = doc(db, "Users", formData.get("id") as string);
  const user = await getDoc(userRef);
  if (user.exists()) {
    const links = user.data().links;
    const newLinks = links.filter(
      (link: any) => link.url != formData.get("url")
    );
    await updateDoc(userRef, {
      links: newLinks,
    });
  }
  revalidatePath(`/user/${formData.get("uid")}`);
}
export async function updateLink(formData: FormData) {
  const userRef = doc(db, "Users", formData.get("id") as string);
  const user = await getDoc(userRef);
  console.log(formData.get("title"));
  if (user.exists()) {
    const links = user.data().links;
    links.map((link: any) => {
      if (link.link_id == formData.get("link_id")) {
        console.log("link changed");
        link.link_id = formData.get("link_id");
        link.title = formData.get("title");
        link.url = formData.get("url");
      }
    });
    console.log(links);
    await updateDoc(userRef, {
      links: links,
    });
  }
  revalidatePath(`/user/${formData.get("uid")}`);
}
