import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import MainLayout from "~/components/MainLayout";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { type ILogin, LoginSchema } from "~/schema/user.schema";
import { api } from "~/utils/api";

const LoginPage = () => {
  const router = useRouter();
  const mutation = api.auth.loginUser.useMutation({
    onSuccess() {
      void router.push("/dashboard");
    },
  });
  return (
    <div className="align-center mt-[100px] flex w-full flex-col">
      <h1 className="mb-6 text-4xl">Login</h1>
      <Formik<ILogin>
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={toFormikValidationSchema(LoginSchema)}
        onSubmit={(values,actions) => {
            mutation.mutate(values);
            actions.resetForm()
        }}
      >
        {({ errors }) => (
          <Form>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Email</span>
              </label>
              <Field
                className="input-bordered input w-full max-w-xs"
                id="email"
                name="email"
                type="email"
                autoComplete="off"
              />
              <label className="label" htmlFor="name">
                <span className="label-text-alt text-red-400">
                  <span>{errors.email}</span>
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Password</span>
              </label>
              <Field
                className="input-bordered input w-full max-w-xs"
                id="password"
                name="password"
                type="password"
              />
              <label className="label">
                <span className="label-text-alt text-red-400">
                  <span>{errors.password}</span>
                </span>
              </label>
            </div>
            {mutation.isError ? (
              <div className="text-red-400">
                An error occurred: {mutation.error.message}
              </div>
            ) : null}

            <button
              className="btn-bordered btn btn-info mt-4 w-full max-w-xs"
              type="submit"
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default LoginPage;