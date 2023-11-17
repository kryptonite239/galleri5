import Link from "next/link";
import { CornerUpRight } from "lucide-react";
const Footer = () => {
  return (
    <footer className=" bg-gray-950 w-full h-[100px] px-3 py-2 flex text-white justify-between">
      <div className="details h-full justify-center flex flex-col">
        <h1 className="text-sm lg:text-2xl font-bold">LinkFolio</h1>
        <p className="text-[10px] lg:text-sm">A simple link aggregator</p>
      </div>
      <div className=" w-1/2 lg:w-1/3">
        <Link
          href="/"
          className="flex gap-1 text-[12px] lg:text-xl h-full items-center p-3 rounded-md w-full justify-center hover:bg-slate-300 hover:text-black"
        >
          Create Your Own LinkFolio Account <CornerUpRight size={20} />
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
