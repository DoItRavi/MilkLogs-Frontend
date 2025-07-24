// file: src/pages/Register.jsx

import { RegisterForm } from "@/components/auth/RegisterForm";
export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-[url('/milkbg.png')] bg-center bg-cover">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
