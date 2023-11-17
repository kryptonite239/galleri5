import LinkForm from "@/components/LinkForm";
import Links from "@/components/Links";
import SignOut from "@/components/button";
import { getLinks, getUser } from "@/lib/actions";
import Link from "next/link";
type User = {
  email: string;
  fname: string;
  lanem: string;
  phoneNumber: string;
  uid: string;
  links: link[];
};
type link = {
  link_id: string;
  title: string;
  url: string;
};
export default async function DashBoard({
  params,
}: {
  params: { userId: string };
}) {
  const { userId: uid } = params;
  const { user, id }: { user: User; id: string } = await (
    await getUser(uid)
  ).json();
  const links = await (await getLinks(id)).json();
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3 p-10">
      <h1 className="text-lg lg:text-4xl font-bold">
        {user?.fname + " " + user?.lanem}'s Dashboard
      </h1>
      <Link href={`/links/${uid}`} className="text-sm font-light underline">
        View Your LinkFolio
      </Link>
      <SignOut />
      <LinkForm uid={uid} id={id} />
      <div className="links w-full h-full flex flex-col gap-5">
        {links.links.length === 0 ? (
          <>No Links Added</>
        ) : (
          links.links.map((link: link) => {
            return <Links link={link} id={id} uid={uid} key={link.url} />;
          })
        )}
      </div>
    </div>
  );
}
