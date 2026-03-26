import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../layouts/AuthLayout";
import useAuth from "../hooks/useAuth";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function SignupPage() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(formData);
      navigate("/dashboard", { replace: true });
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to create your account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Create your account"
        subtitle="Set up your workspace to generate, organize, and analyze short links."
        fields={[
          {
            label: "Full name",
            name: "name",
            type: "text",
            placeholder: "Ridhima Kapoor",
            autoComplete: "name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "you@example.com",
            autoComplete: "email",
          },
          {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Minimum 6 characters",
            autoComplete: "new-password",
          },
        ]}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Create account"
        footer={
          <>
            Already have an account?{" "}
            <Link className="font-semibold text-brand-300 hover:text-brand-200" to="/login">
              Sign in
            </Link>
          </>
        }
      />
    </AuthLayout>
  );
}

export default SignupPage;
