import { NavLink, useNavigate } from "react-router";
import styles from './styles/profile.module.css'
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { usersQueries } from "@/queries/user";

export default function Profile({ onCloseProfile }: { onCloseProfile: () => void }) {
  const { data: user } = useSuspenseQuery(usersQueries.me);
  const signoutMutation = useMutation(usersQueries.signout);

  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signoutMutation.mutateAsync();

      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangePic() {
    try {
      // showLoader(true);
      // await User.update({uid: user.uid, photoURL: e.target.files[0]})
      onCloseProfile();
      // showLoader(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.profile}>
      <p>{user?.email}</p>
      <div className={styles.imgContainer}>
        <img src={"/profile.png"} alt="Profile Pic" className={styles.btn} />
        <input
          type="file"
          id="profileInput"
          accept="image/*"
          onChange={handleChangePic}
          style={{ display: 'none' }}
        />
        <label htmlFor="profileInput">edit</label>
        <h2>Hi, {user?.name}!</h2>
        <NavLink to="/manage-account">Mange your account</NavLink>
        <footer>
          <button type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </footer>
      </div>
    </div>
  );
}