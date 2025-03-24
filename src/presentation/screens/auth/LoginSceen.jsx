import { SignInPage } from "@toolpad/core/SignInPage";
import { useNavigate } from "react-router";
import { AuthService } from "@/application/services/AuthService"; // Updated import

export default function Login() {
  const authService = new AuthService();
  const providers = [{ id: "google", name: "Google" }];
  const navigate = useNavigate();

  const handleSignIn = async (provider) => {
    try {
      if (provider.id === "google") {
        await authService.login();
      } else {
        console.error("Unsupported provider:", provider);
      }
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <SignInPage
      signIn={handleSignIn}
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
