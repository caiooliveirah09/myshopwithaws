import DefaultButton from "@/components/atoms/buttons/defaultButton";
import Overlay from "@/components/atoms/modal/overlay";
import Text from "@/components/atoms/text/text";
import TextInputWithLabel from "@/components/molecules/inputs/textInputWithLabel";
import React from "react";
import UserPool from "../../UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";
import { confirmRegistrationSchema } from "./validations";
import { useRouter } from "next/navigation";

export default function ConfirmRegistration({ email }: { email: string }) {
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState({} as any);
  const router = useRouter();
  
  const confirmRegistration = (event: any) => {
    event.preventDefault();
    confirmRegistrationSchema.validate({ code }, { abortEarly: false })
      .then(() => {
        const cognitoUser = new CognitoUser({
          Username: email,
          Pool: UserPool,
        });
        
        cognitoUser.confirmRegistration(code, true, (err, data) => {
          if (err) console.error(err);

          router.push('/login');
        });
      })
      .catch((errors: { inner: { path: string; message: string }[] }) => {
        const validationErrors: { [key: string]: string | undefined } = {};

        errors.inner.forEach((error) => {
          validationErrors[error.path] = "* " + error.message;
        });

        setErrors(validationErrors);
      });
  };

  return (
    <Overlay>
      <form className="bg-gray-900 py-4 px-2 flex flex-col justify-center w-full max-w-xs text-white border border-gray-700" onSubmit={confirmRegistration}>
        <div className="pb-3 text-center">
          <Text align="center">
            Please enter the verification code which we send to:
          </Text>
        </div>
        <div className="text-center font-bold h-fit">
          <Text align="center">{email}</Text>
        </div>
        <div className="pt-3">
          <TextInputWithLabel
            placeholder="enter your verification code"
            label="Verification code"
            value={code}
            onChange={(event: any) => setCode(event.target.value)}
            error={errors.code}
          />
          <DefaultButton text="Verify" />
        </div>
      </form>
    </Overlay>
  );
}
