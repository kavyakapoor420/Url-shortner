import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../layouts/AuthLayout";
import useAuth from "../hooks/useAuth";

const initialState = {
  email: "",
  password: "",
};

function LoginPage() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      await login(formData);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to log in right now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Sign in to your workspace"
        subtitle="Access your private link dashboard and continue tracking your URLs."
        fields={[
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
            placeholder: "Enter your password",
            autoComplete: "current-password",
          },
        ]}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Login"
        footer={
          <>
            Don&apos;t have an account?{" "}
            <Link className="font-semibold text-brand-300 hover:text-brand-200" to="/signup">
              Create one
            </Link>
          </>
        }
      />
    </AuthLayout>
  );
}

export default LoginPage;
