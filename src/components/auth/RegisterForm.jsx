import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, verifyOtp } from "@/store/slices/authSlice";

export function RegisterForm({ className, ...props }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [serverError, setServerError] = useState("");

  const [secondsLeft, setSecondsLeft] = useState(20);
  const timerRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  const startTimer = () => {
    // if there’s an existing timer, clear it first
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setSecondsLeft(20);
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // reached 0 → stop timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const validateName = (username) => {
    if (!username) return "Username is required";
    if (username.length < 2) return "Username must be at least 2 characters";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateOTP = (otp) => {
    if (!otp) return "OTP is required";
    if (otp.length !== 6) return "OTP must be 6 digits";
    if (!/^\d{6}$/.test(otp)) return "OTP must contain only numbers";
    return "";
  };

  const handleNext = async () => {
    // Clear server errors
    setServerError("");
    // Client‑side validation
    const nErr = validateName(username);
    const eErr = validateEmail(email);
    setUsernameError(nErr);
    setEmailError(eErr);
    if (nErr || eErr) return;

    try {
      await dispatch(register({ username, email })).unwrap();
      setStep(2);
      startTimer();
    } catch (err) {
      setServerError(err.message || JSON.stringify(err));
    }
  };

  const handleResend = async () => {
    try {
      setOtpError("");
      setServerError("");
      setOtp("");
      await dispatch(register({ username, email })).unwrap();
      startTimer();
    } catch (err) {
      setServerError(err.message || JSON.stringify(err));
    }
  };

  const handleBack = () => {
    setOtpError("");
    setServerError("");
    setOtp("");
    clearTimer();
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const oErr = validateOTP(otp);
    setOtpError(oErr);
    if (oErr) return;

    try {
      // Dispatch verifyOtp and on success navigate to dashboard
      await dispatch(verifyOtp({ username, email, otp })).unwrap();
      navigate("/consumer/dashboard", { replace: true });
    } catch (err) {
      setServerError(err.message || JSON.stringify(err));
    }
  };

  const handleLoginClick = () => {
    navigate("/consumer/login", { replace: true });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-2">
        <CardContent className="grid p-2 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Join MilkLogs Now
                </p>
              </div>

              {step === 1 && (
                <>
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="John Doe"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError("");
                        setServerError("");
                      }}
                      className={usernameError ? "border-red-500" : ""}
                    />
                    {usernameError && (
                      <p className="text-sm text-red-500">{usernameError}</p>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abc@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                        setServerError("");
                      }}
                      className={emailError ? "border-red-500" : ""}
                    />
                    {emailError && (
                      <p className="text-sm text-red-500">{emailError}</p>
                    )}
                  </div>

                  {/* Server Error */}
                  {serverError && (
                    <p className="text-sm text-red-500 text-center">
                      {serverError}
                    </p>
                  )}

                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full"
                    loading={status === "loading" && step === 1}
                    disabled={status === "loading" && step === 1}
                  >
                    Next
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-3">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => {
                          setOtp(value);
                          setOtpError("");
                          setServerError("");
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className="flex justify-end items-center space-x-4">
                      {/* countdown display */}
                      <span className="text-sm text-gray-400">
                        {secondsLeft <= 0 ? "" : `Resend in ${secondsLeft}s`}
                      </span>

                      {/* resend button */}
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={secondsLeft > 0}
                        className="text-sm underline disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                      >
                        Resend OTP
                      </button>
                    </div>
                    {otpError && (
                      <p className="text-sm text-red-500 text-center">
                        {otpError}
                      </p>
                    )}
                  </div>
                  {/* Server Error */}
                  {serverError && (
                    <p className="text-sm text-red-500 text-center">
                      {serverError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    loading={status === "loading" && step === 2}
                    disabled={status === "loading" && step === 2}
                  >
                    Submit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="w-full"
                  >
                    Back
                  </Button>
                </>
              )}

              <div className="text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="underline underline-offset-4"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="relative hidden md:block bg-[url('/bgVertical.png')] bg-center bg-cover"></div>
        </CardContent>
      </Card>
      <div className="text-sm text-center text-black">
        By clicking continue, you agree to our{" "}
        <Link
          href="#"
          className="text-black underline underline-offset-4 hover:text-white transition-colors"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="text-black underline underline-offset-4 hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
