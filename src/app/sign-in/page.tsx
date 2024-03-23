import { InputWithLabel } from "@/components/Inputs/InputWithLabel";
import { Button } from "@/components/ui/button";

export default function SigninPage() {
  return (
    <main className="grid grid-cols-3 h-screen w-screen">
      <div
        className={`col-span-3 md:col-span-2 flex justify-center items-center bg-[url("/planting.jpg")] bg-cover bg-no-repeat md:bg-none md:bg-background px-4`}
      >
        <div className="min-w-80 min-h-60 w-[425px] bg-white rounded-xl shadow-xl p-4">
          <h2 className="font-bold text-xl text-center mt-6">Welcome Back!</h2>
          <form className="flex flex-col gap-4 mt-5">
            <InputWithLabel
              className="bg-slate-100 focus:!outline-none focus:!ring-0"
              type="text"
              label="Email"
              id="email"
              name="email"
            />
            <InputWithLabel
              className="bg-slate-100 focus:!outline-none focus:!ring-0"
              type="password"
              label="Password"
              id="password"
              name="password"
            />
            <Button
              className="bg-primary text-black font-bold hover:bg-secondary"
              type="button"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
      <div
        className={`col-span-1 bg-no-repeat w-full h-screen bg-cover bg-center hidden md:block bg-[url("/planting.jpg")]`}
      ></div>
    </main>
  );
}
