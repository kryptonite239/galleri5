"use client";

import { deleteLink, updateLink } from "@/lib/actions";
import { useState } from "react";
import { Trash2, PenSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
type link = {
  link_id: string;
  title: string;
  url: string;
};
const Links = ({ link, id, uid }: { link: link; id: any; uid: string }) => {
  const [update, setUpdate] = useState(false);
  return (
    <>
      <div
        key={link.url}
        className="w-full flex flex-col gap-3 items-center justify-center border-2 px-3 py-2 border-black rounded-2xl"
      >
        <div className="w-full flex items-center justify-center">
          <div className="details flex flex-col w-full h-full items-start justify-center">
            <h2 className="text-[10px] lg:text-xl md:text-md">
              Title: {link.title}
            </h2>
            <p className=" text-[8px] lg:text-xl md:text-md">Url: {link.url}</p>
          </div>
          <div className="w-full h-full flex items-center justify-end">
            <form
              action={async (formData) => {
                formData.append("id", id);
                formData.append("url", link.url);
                formData.append("uid", uid);
                await deleteLink(formData);
              }}
              className="w-[50px] h-full flex items-center justify-center"
            >
              <button
                type="submit"
                className="h-[40px] w-[40px] hover:bg-red-500 ease-in flex justify-center items-center rounded-xl"
              >
                <Trash2 size={28} />
              </button>
            </form>

            <button
              onClick={() => setUpdate(!update)}
              className="h-[40px] w-[40px] hover:bg-yellow-500 ease-in flex justify-center items-center rounded-xl"
            >
              <PenSquare size={24} />
            </button>
          </div>
        </div>
        {update && (
          <form
            action={async (formdata) => {
              formdata.append("link_id", link.link_id);
              formdata.append("id", id);
              formdata.append("uid", uid);
              await updateLink(formdata);
              setUpdate(true);
            }}
            className="w-full p-2 max-[700px]:flex-col max-[700px]:gap-3 flex items-center justify-evenly"
          >
            <Input
              type="text"
              name="title"
              required
              className="w-full lg:w-1/4"
              placeholder="Enter Title"
            />
            <Input
              type="text"
              name="url"
              required
              className="w-full lg:w-1/4"
              placeholder="Enter URL"
            />
            <Button type="submit" className="max-[700px]:w-full">
              Update
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => setUpdate(false)}
              className="max-[700px]:w-full"
            >
              Cancel
            </Button>
          </form>
        )}
      </div>
    </>
  );
};
export default Links;
