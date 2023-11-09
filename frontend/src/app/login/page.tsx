"use client";
import DefaultButton from "@/components/atoms/buttons/defaultButton";
import TextInputWithLabel from "@/components/molecules/inputs/textInputWithLabel";
import SmallLink from "@/components/atoms/small/smallLink";
import React, { useEffect } from "react";
import { signInSchema } from "./validations";
import SmallError from "@/components/atoms/small/smallError";
import UserPool from "../../UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { useRouter } from "next/navigation";
import { rgbBackgroundStyleEffect, textCyberpunkStyleEffectWithoutAnimation } from "@/style/styleEffects";
import H2 from "@/components/atoms/titles/h2";
import H1 from "@/components/atoms/titles/h1";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({} as any);
  const [signInError, setSignInError] = React.useState(false);
  const router = useRouter();

  const signIn = (event: any) => {
    event.preventDefault();
    signInSchema
      .validate({ email, password }, { abortEarly: false })
      .then(() => {

        const cognitoUser = new CognitoUser({
          Username: email,
          Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (data) => {
            router.push("/");
          },

          onFailure: (err) => {
            console.error("onFailure:", err);
          },

          newPasswordRequired: (data) => {
            console.log("newPasswordRequired:", data);
          },
        });
      })
      .catch((errors: { inner: { path: string; message: string }[] }) => {
        console.log(errors);
        const validationErrors: { [key: string]: string | undefined } = {};

        errors.inner.forEach((error) => {
          validationErrors[error.path] = "* " + error.message;
        });

        setErrors(validationErrors);
        setSignInError(true);
      });
  };

  return (
      <main className="bg-gray-900 w-full max-w-md h-fit flex flex-col sm:h-fit sm:border border-gray-700">
          <div className="py-4">
            <H1 text="MSA" align="center" />
          </div>
        <form onSubmit={signIn} className="m-auto w-full">
          <div >
            <H2 text="Login" align="right" />
          </div>
          <div className="flex gap-y-3 flex-col">
            <TextInputWithLabel
              label="Email"
              placeholder="type your email here"
              value={email}
              onChange={(event: any) =>
                setEmail(event.target.value.toLowerCase())
              }
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
            {signInError && (
              <div className="p-2">
              <SmallError>* email or password incorrect</SmallError>
              </div>
            )}
          </div>
          <div className="mt-4">
            <DefaultButton text="Sign in" />
          </div>
          <SmallLink
            text="Don't have an account? Sign up"
            href="/register"
            align="center"
          />
        </form>
      </main>
  );
}
