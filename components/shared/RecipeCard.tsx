import Image from "next/image";
import { Separator } from "../ui/separator";
import { ExternalLink, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/utils";

interface RecipeCardProps {
  name: string;
  imageUrl: string;
  isAuthor: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
  const { name, imageUrl, isAuthor } = props;

  return (
    <div className="rounded-xl bg-muted h-full flex flex-col">
      <header className="grid pb-6">
        <Image
          src={imageUrl}
          width={150}
          height={150}
          alt={`${name} picture`}
          className="rounded-full -mt-12 mx-auto border-2 shadow-xl"
        />
      </header>

      <div className="pb-2 px-4 flex-1 grid place-items-center">
        <p className="text-center font-bold">{name}</p>
      </div>

      <Separator />

      <footer
        className={cn(
          `flex items-center justify-between p-3`,
          !isAuthor && "justify-center"
        )}
      >
        {isAuthor && (
          <Button size="sm" variant="outline">
            Edit
            <Pencil className="size-4 ml-2" />
          </Button>
        )}

        <Button size="sm">
          View recipe
          <ExternalLink className="size-4 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
