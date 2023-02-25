import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import MainLayout from "~/components/MainLayout";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { type IRegister, RegisterSchema } from "~/schema/user.schema";
import { api } from "~/utils/api";

const RegisterPage = () => {
  const router = useRouter();
  const mutation = api.auth.registerUser.useMutation({
    onSuccess() {
      void router.push("/login");
    },
  });
  return (
    <div className="align-center mt-[100px] flex w-full flex-col">
      <h1 className="mb-6 text-4xl">Signup</h1>
      <Formik<IRegister>
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={toFormikValidationSchema(RegisterSchema)}
        onSubmit={(values: IRegister) => {
            mutation.mutate(values);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <Field
                className="input-bordered input w-full max-w-xs"
                id="name"
                name="name"
                autoComplete="off"
              />
              <label className="label" htmlFor="name">
                <span className="label-text text-red-400">
                  <span>{errors.name}</span>
                </span>
              </label>
            </div>

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
              className="btn-bordered btn mt-4 w-full max-w-xs"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default RegisterPage;
