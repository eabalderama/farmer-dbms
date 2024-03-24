import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  image?: string;
  initials: string;
}

export default function ProfileAvatar({ image, initials }: ProfileProps) {
  return (
    <Avatar className="w-[48px] h-[48px] ring-2 ring-primary ring-offset-2">
      <AvatarImage src={image} />
      <AvatarFallback className="bg-secondary text-2xl text-emerald-800">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
