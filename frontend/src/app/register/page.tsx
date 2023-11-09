'use client'
import DefaultButton from "@/components/atoms/buttons/defaultButton";
import TextInputWithLabel from "@/components/molecules/inputs/textInputWithLabel";
import SmallLink from "@/components/atoms/small/smallLink";
import UserPool from "../../UserPool";
import React from "react";
import { signUpSchema } from "./validations";
import ConfirmRegistration from "./confirmRegistration";
import H2 from "@/components/atoms/titles/h2";
import { textCyberpunkStyleEffectWithoutAnimation } from "@/style/styleEffects";
import H1 from "@/components/atoms/titles/h1";

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errors, setErrors] = React.useState({} as any);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const signUp = (event: any) => {
    event.preventDefault();
    signUpSchema.validate({ email, password, confirmPassword }, { abortEarly: false }).then(() => {
      UserPool.signUp(email, password, [], null, (err, data) => {
         if (err) console.error(err);
         console.log(data);
      })

      setShowConfirmPassword(true);
    }).catch((errors: { inner: { path: string, message: string}[]}) => {
      const validationErrors: {[key: string]: string | undefined;} = {};

      errors.inner.forEach((error) => {
        validationErrors[error.path] = '* ' + error.message;
      });

      setErrors(validationErrors);
    })
  }

  return (
    <main className="bg-gray-900 w-full max-w-md h-fit flex flex-col sm:h-fit sm:border border-gray-700">
        <div className="py-4">
            <H1 text="MSA" align="center" />
          </div>
      <form onSubmit={signUp} className="m-auto w-full">
        <div className="">
          <H2 text="Register" align="right" />
        </div>
        <div className="flex gap-y-3 flex-col">
          <TextInputWithLabel
            label="Email"
            placeholder="type your email here"
            value={email}
            onChange={(event: any) => setEmail((event.target.value).toLowerCase())}
            error={errors.email}
          />
          <TextInputWithLabel
            label="Password"
            placeholder="type your password here"
            value={password}
            onChange={(event: any) => setPassword(event.target.value)}
            error={errors.password}
            type="password"
          />
          <TextInputWithLabel
            label="Confirm your password"
            placeholder="type again your password here"
            value={confirmPassword}
            onChange={(event: any) => setConfirmPassword(event.target.value)}
            error={errors.confirmPassword}
            type="password"
          />
        </div>
        <div className="mt-4">
          <DefaultButton text="Sign up" />
        </div>
        <SmallLink
          text="Already have an account? Sign in"
          href="/login"
          align="center"
        />
      </form>
      {showConfirmPassword && <ConfirmRegistration email={email}/>}
    </main>
  );
}
