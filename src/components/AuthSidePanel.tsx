import Image from 'next/image';

export function AuthSidePanel() {
  return (
    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-[#0a0f25] to-[#092c4c] p-10 w-full md:w-1/2">
      <Image src="/logo.png" alt="Logo MovieHub" width={288} height={288} />
      <h2 className="text-3xl font-bold text-white-900">
        Bem-vindo ao MovieHub!
      </h2>
      <p className="text-white-800 text-center mt-4">
        Descubra, avalie e acompanhe seus filmes favoritos de forma simples e
        interativa.
      </p>
    </div>
  );
}
