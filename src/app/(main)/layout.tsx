import SideBar from "@/components/SideBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row w-screen h-screen">
      <SideBar />
      <section className="flex-1 bg-gray-50">{children}</section>
    </main>
  );
}
