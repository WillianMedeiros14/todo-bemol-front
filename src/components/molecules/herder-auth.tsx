import Image from "next/image";

interface IHerderAuthProps {
  title: string;
  description: string;
}

export function HerderAuth({ title, description }: IHerderAuthProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={"/assets/logoBemolDigital.png"}
          alt={"Bemol digital"}
          width={100}
          height={100}
        />
      </div>

      <span className="text-3xl font-bold text-center mb-2">{title}</span>
      <span className="font-normal text-center text-white-500">
        {description}
      </span>
    </div>
  );
}
