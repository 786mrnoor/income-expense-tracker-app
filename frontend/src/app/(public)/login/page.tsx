import { NavLink, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';
import { loginSchema, type LoginSchema } from './login.schema';

import useTitle from '@/hooks/use-title';
import Loader from '@/components/loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { setAccessToken } from '@/lib/token';
import applyBackendErrors from '@/utils/apply-backend-errors';
import { loginResponseSchema } from '@/schemas/auth/response.login.schema';
import { customFetch } from '@/utils/custom-fetch';

export default function Login() {
  useTitle('Login');

  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
    defaultValues: {
      email: "786mrnoor@gmail.com",
      password: 'Noor@123'
    },
    resolver: zodResolver(loginSchema)
  });

  async function onSubmit(formData: LoginSchema) {
    try {
      const data = await customFetch({
        path: '/api/auth/login',
        method: 'POST',
        response: loginResponseSchema,
        body: formData,
        credentials: "include"
      });

      setAccessToken(data?.accessToken)
      navigate('/')
    } catch (err: any) {
      console.error(err);
      applyBackendErrors(err, setError);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} spellCheck="false" autoComplete="off">
        <h1>Login</h1>
        <main>

          <div className={styles.inputGroupFloat}>
            <input {...register("email")} type="text" placeholder="" />
            <span>Email</span>
            {errors.email && <p>{errors.email?.message}</p>}
          </div>

          <div className={styles.inputGroupFloat}>
            <input {...register("password")} type="password" placeholder='' />
            <span>Password</span>
            {errors.password && <p>{errors.password?.message}</p>}
            {errors.root && <p>{errors.root.message}</p>}
          </div>

        </main>
        <footer>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <NavLink to="/signup">Signup</NavLink>
          </p>
        </footer>
      </form>
      <Loader show={isSubmitting} />
    </div>
  );
}