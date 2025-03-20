import { SignInPage } from "@toolpad/core/SignInPage";
import { signIn } from "@/application/services/authManager"; // Updated import

export default function Login() {
  const providers = [{ id: "google", name: "Google" }];
  const handleSignIn = async (provider) => {
    const result = await signIn(provider);
    if (result.user) {
      console.log("Signed in user:", result.user);
    } else {
      console.error("Error signing in:", result.error);
    }
  };

  return (
    <SignInPage
      signIn={handleSignIn} // Updated function name
      providers={providers}
      slotProps={{ form: { noValidate: true } }}
      sx={{
        "& form > .MuiStack-root": {
          marginTop: "2rem",
          rowGap: "0.5rem",
        },
      }}
    />
  );
}
