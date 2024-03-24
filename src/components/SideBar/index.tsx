import { getServerSession } from "next-auth";
import Profile from "../Profile";
import { Separator } from "../ui/separator";
import LinkButton from "./LinkButton";
import { authOptions } from "@/lib/authOptions";

const links = [
  {
    path: "/",
    label: "Dashboard",
  },
  {
    path: "/farmers",
    label: "Farmers",
  },
  {
    path: "/planted-crops",
    label: "Planted Crops",
  },
  {
    path: "/crops",
    label: "Crops",
  },
  {
    path: "/input-types",
    label: "Input Types",
  },
];

const adminLinks = [
  {
    path: "/extension-workers",
    label: "Extension Workers",
  },
  {
    path: "/expertise",
    label: "Expertise",
  },
];

export default async function SideBar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="w-[300px] bg-background py-5 border-r flex flex-col">
      <h2 className="text-center text-3xl font-bold my-3 text-emerald-800">
        FDBMS
      </h2>
      <div className="flex flex-col gap-2 mt-5">
        {links.map((link) => {
          return <LinkButton key={link.path} {...link} />;
        })}
        <Separator className="my-4" />
        {session &&
          session.user.role === "ADMIN" &&
          adminLinks.map((link) => {
            return <LinkButton key={link.path} {...link} />;
          })}
      </div>
      <div className="flex-1 flex flex-col justify-end">
        {session && (
          <Profile
            name={session.user.name}
            image={session.user.picture}
            role={session.user.role}
          />
        )}
      </div>
    </nav>
  );
}
