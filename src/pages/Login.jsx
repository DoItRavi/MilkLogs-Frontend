import { LoginForm } from "@/components/auth/LoginForm";
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-[url('/milkbg.png')] bg-center bg-cover">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
