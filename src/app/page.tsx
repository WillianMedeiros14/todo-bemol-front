import { HerderAuth } from "@/components/molecules/herder-auth";
import { SignIn } from "@/components/organism/signIn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col w-[480px]">
        <HerderAuth
          title="Seja bem-vindo"
          description="Entre com seu e-mail e senha"
        />

        <SignIn />
      </div>
    </main>
  );
}
