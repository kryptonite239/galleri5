"use client";
import { addLink } from "@/lib/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
type Props = {
  id: string | undefined;
  uid: string | null;
};
const LinkForm = ({ id, uid }: Props) => {
  return (
    <form
      action={async (formdata: FormData) => {
        formdata.append("id", id as string);
        formdata.append("uid", uid as string);
        await addLink(formdata);
      }}
      className="w-full h-[200px] flex flex-col gap-3 items-center justify-center"
    >
      <h2>Add New Link</h2>
      <Input type="text" name="title" placeholder="Link Title" />
      <Input type="text" name="url" placeholder="Link URL" />
      <Button type="submit" className="w-full">
        Add Link
      </Button>
    </form>
  );
};

export default LinkForm;
