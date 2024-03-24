import SignInForm from "@/components/Forms/SignInForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <main className="grid grid-cols-3 h-screen w-screen">
      <div
        className={`col-span-3 md:col-span-2 flex justify-center items-center bg-[url("/planting.jpg")] bg-cover bg-no-repeat md:bg-none md:bg-background px-4`}
      >
        <div className="min-w-80 min-h-60 w-[425px] bg-white rounded-xl shadow-xl p-4">
          <h2 className="font-bold text-xl text-center mt-6">Welcome Back!</h2>
          <SignInForm />
        </div>
      </div>
      <div
        className={`col-span-1 bg-no-repeat w-full h-screen bg-cover bg-center hidden md:block bg-[url("/planting.jpg")]`}
      ></div>
    </main>
  );
}
