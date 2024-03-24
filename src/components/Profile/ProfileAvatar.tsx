import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  image?: string;
  initials: string;
}

export default function ProfileAvatar({ image, initials }: ProfileProps) {
  return (
    <Avatar className="w-[54px] h-[54px]">
      <AvatarImage src={image} />
      <AvatarFallback className="bg-secondary">{initials}</AvatarFallback>
    </Avatar>
  );
}
