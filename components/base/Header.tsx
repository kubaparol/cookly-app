import { Button } from "../ui/button";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="p-5 md:px-10 max-w-7xl mx-auto w-full flex justify-between items-center">
      <Logo />

      <Button size="lg">Login</Button>
    </header>
  );
}
