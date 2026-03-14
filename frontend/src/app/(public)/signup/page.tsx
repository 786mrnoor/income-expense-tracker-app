import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';
import { signupSchema, type SignupSchema } from './signup.schema';
import useTitle from '@/hooks/use-title';
import Loader from '@/components/loader';
import { zodResolver } from '@hookform/resolvers/zod';
import applyBackendErrors from '@/utils/apply-backend-errors';
import { useNavigate } from 'react-router'
import { customFetch } from '@/utils/custom-fetch';
import { signupResponseSchema } from '@/schemas/auth/response.signup.schema';
export default function Signup() {
  useTitle('Login');

  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignupSchema>({
    defaultValues: {
      name: "Noor",
      email: "786mrnoor@gmail.com",
      password: 'Noor@123'
    },
    resolver: zodResolver(signupSchema)
  });

  async function onSubmit(formData: SignupSchema) {
    try {
      await customFetch({
        path: '/api/auth/signup',
        method: 'POST',
        response: signupResponseSchema,
        body: formData,
      });
      navigate('/login');

    } catch (err: any) {
      console.error(err);
      applyBackendErrors(err, setError);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} spellCheck="false" autoComplete="off">
        <h1>Signup</h1>
        <main>

          <div className={styles.inputGroupFloat}>
            <input {...register("name")} type="text" placeholder="" />
            <span>Full Name</span>
            {errors.name && <p>{errors.name?.message}</p>}
          </div>

          <div className={styles.inputGroupFloat}>
            <input {...register("email")} type="text" placeholder="" />
            <span>Email</span>
            {errors.email && <p>{errors.email?.message}</p>}
          </div>

          <div className={styles.inputGroupFloat}>
            <input {...register("password")} type="password" placeholder='' />
            <span>Password</span>
            {errors.password && <p>{errors.password?.message}</p>}
            {errors.root && <p>{errors.root?.message}</p>}
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