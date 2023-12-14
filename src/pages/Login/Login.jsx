import { Button, Paper, Stack } from "@mui/material";
import React from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { object, string } from "yup";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/slices/authUser";

const validationSchema = object().shape({
  email: string().email("Invalid email").required("Required"),
  password: string().required("Required"),
});

const Login = () => {
  // dispatch
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmit }) => {
    const toastID = toast.loading("Logging in...");
    try {
      const res = await axios.post("/auth/login", values);

      const { data, token } = res;

      // check user role
      if (data.type !== "admin") {
        toast.error("You are not authorized as admin.", {
          id: toastID,
        });
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Logged in", { id: toastID });

        dispatch(setAuthUser(data));
      }
    } catch (error) {
      toast.error(error.message, {
        id: toastID,
      });
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Paper className="w-[90%] max-w-[450px] px-4 py-7">
        <h2 className="mb-6 text-xl font-semibold text-center">Login</h2>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <Field
                  component={TextField}
                  name="email"
                  label="Email"
                  size="small"
                  fullWidth
                />
                <Field
                  component={TextField}
                  name="password"
                  label="Password"
                  size="small"
                  type="password"
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  fullWidth
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default Login;
