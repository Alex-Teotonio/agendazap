import { Navbar } from "@/components/custom/Navbar";
import { LoginForm } from "@/features/auth/LoginForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
}
