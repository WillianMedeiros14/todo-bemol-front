import { SignIn } from "@/components/organism/signIn";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col w-[480px]">
        <div className="flex items-center justify-center mb-4">
          <Image
            src={"/assets/logoBemolDigital.png"}
            alt={"Bemol digital"}
            width={100}
            height={100}
          />
        </div>

        <span className="text-3xl font-bold text-center mb-2">
          Seja bem-vindo
        </span>
        <span className="font-normal text-center text-white-500">
          Entre com seu e-mail e senha
        </span>

        <SignIn />
      </div>
    </main>
  );
}
