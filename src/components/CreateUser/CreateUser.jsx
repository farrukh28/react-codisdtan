import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React from "react";
import { toast } from "sonner";
import { object, string } from "yup";

const validationSchema = object().shape({
  firstName: string().required("Required"),
  lastName: string(),
  email: string().email("Invalid email").required("Required"),
  password: string().min(6, "Minimum 6 characters").required("Required"),
});

const CreateUser = ({ open, toggle, refetch }) => {
  const handleClose = () => {
    toggle();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const toastID = toast.loading("Creating user...");
    try {
      await axios.post(`/users`, values);
      handleClose();
      refetch();
      toast.success("User created", { id: toastID });
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} fullWidth onClose={handleClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <DialogContentText>Fields (*) are required</DialogContentText>
        <div className="mt-4">
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <div>
                    <Stack
                      direction={{
                        xs: "column",
                        md: "row",
                      }}
                      spacing={2}
                    >
                      <Field
                        component={TextField}
                        name="firstName"
                        label="First Name"
                        required
                        fullWidth
                        size="small"
                      />
                      <Field
                        component={TextField}
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        size="small"
                      />
                    </Stack>
                  </div>
                  <Field
                    component={TextField}
                    name="email"
                    label="Email"
                    required
                    fullWidth
                    size="small"
                  />
                  <Field
                    component={TextField}
                    name="password"
                    label="Password"
                    size="small"
                    type="password"
                    fullWidth
                    required
                  />

                  <div className="flex flex-wrap justify-end gap-3">
                    <Button
                      variant="outlined"
                      onClick={handleClose}
                      color="secondary"
                      size="small"
                      disabled={isSubmitting}
                    >
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      size="small"
                      disabled={isSubmitting}
                      disableElevation
                    >
                      Create
                    </Button>
                  </div>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
