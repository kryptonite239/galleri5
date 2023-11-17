import { getLinks, getUser } from "@/lib/actions";
import { User } from "@/lib/types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
export default async function Links({
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
    <div className="w-full  flex flex-col items-center justify-center gap-5 p-2">
      <h1 className="text-3xl font-bold">
        {user.fname} {user.lanem}'s Links
      </h1>
      <div className="w-full lg:w-1/3 flex flex-col border-2 border-black p-2 rounded-md gap-3 items-center justify-start">
        {links.links.map((link: any) => {
          return (
            <div
              key={link.id}
              className="w-full p-2 bg-slate-100 hover:bg-slate-700 hover:text-white cursor-pointer rounded-md"
            >
              <Link
                href={link.url}
                target="_blank"
                className="w-full flex justify-between"
              >
                <h3 className="font-bold">{link.title}</h3>
                <ExternalLink />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
