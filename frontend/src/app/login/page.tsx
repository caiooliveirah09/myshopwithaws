import DefaultButton from "@/components/molecules/buttons/defaultButton";
import TextInputWithLabel from "@/components/molecules/inputs/textInputWithLabel";
import SmallLink from "@/components/molecules/small/smallLink";
import H1 from "@/components/molecules/titles/h1";

export default function Login() {
  return (
    <main className="w-full h-screen flex items-center justify-center p-1">
      <form className="border-black border py-20 w-full max-w-md">
        <div className="mb-3">
          <H1 text="Login" align="left" />
        </div>
        <div className="flex gap-y-3 flex-col">
          <TextInputWithLabel
            label="email"
            placeholder="type your email here"
          />
          <TextInputWithLabel
            label="password"
            placeholder="type your password here"
          />
        </div>
        <DefaultButton text="Sign in" />
        <SmallLink
          text="Don't have an account? Sign up"
          href="/register"
          align="center"
        />
      </form>
    </main>
  );
}
