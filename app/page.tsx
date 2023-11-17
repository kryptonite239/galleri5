"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FormEvent, useState } from "react";
import { E164Number } from "libphonenumber-js/core";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase.config";
import OtpInput from "react-otp-input";
import { useAuth } from "@/cotext/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
declare const window: any;
export default function Home() {
  const [value, setValue] = useState<E164Number | undefined>();
  const [sent, isSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();

  // if (user) {
  //   router.push(`/user/${user.uid}`);
  // }
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            handleSubmit;
          },
          "expired-callback": () => {},
        }
      );
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + value;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        isSent(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        isSent(false);
        try {
          const quertSnap = await getDocs(collection(db, "Users"));
          let userExists = false;
          let userId;
          quertSnap.forEach((doc) => {
            if (doc.data().phoneNumber === value) {
              userId = doc.data().uid;
              userExists = true;
            }
          });
          if (userExists) {
            router.push(`/user/${userId}`);
          } else router.push(`/register/${res.user.uid}`);
        } catch (err) {}
      })
      .catch((err: any) => console.log(err));
  };
  return (
    <main className=" flex flex-col items-center justify-center w-full h-[100vh]">
      <h1 className=" text-2xl lg:text-4xl font-bold w-full flex justify-center ">
        Welcome to LinkFolio!
      </h1>

      {sent ? (
        <form
          onSubmit={checkOtp}
          className="w-full h-[200px] flex flex-col items-center justify-center gap-3"
        >
          <h3 className="text-xl font-medium">Enter OTP</h3>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={() => <span>-</span>}
            shouldAutoFocus={true}
            renderInput={(props) => <input {...props} />}
            containerStyle="flex gap-2 p-3"
            inputStyle={"text-2xl rounded-md border-2 border-black"}
          />
          <Button type="submit">Confirm</Button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full h-[200px] items-center justify-center"
        >
          <h3 className="text-xs lg:text-xl font-medium">
            Enter Your Phone Number To Continue
          </h3>
          <div className="p-2 rounded-xl flex gap-5 flex-col text-text justify-center">
            <PhoneInput
              defaultCountry="IN"
              international
              value={value}
              onChange={setValue}
              className="w-[300px] h-[50px] p-3 text-bg text-xl border-2 border-bg"
            />
            <div id="recaptcha-container"></div>
            <Button type="submit" className="w-full">
              Send Otp
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}
