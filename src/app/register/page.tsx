import { HerderAuth } from "@/components/molecules/herder-auth";
import { SignIn } from "@/components/organism/signIn";
import { SignUp } from "@/components/organism/signUp";

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col w-[480px]">
        <HerderAuth
          title="Olá, cadastre aqui!"
          description="Insira as suas informções"
        />

        <SignUp />
      </div>
    </main>
  );
}
