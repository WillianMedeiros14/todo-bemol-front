import { Navbar } from "@/components/molecules/navbar";

export default function Todo() {
  return (
    <main className="flex max-w-screen-2xl mx-auto min-h-screen flex-col p-10">
      <Navbar />

      <div className="w-full self-center mb-8">
        <h1 className="text-2xl font-semibold">
          Produto
          {/* <span className="font-normal"> {data?.name}</span> */}
        </h1>
      </div>
    </main>
  );
}
