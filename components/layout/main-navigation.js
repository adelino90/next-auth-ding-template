import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession(); // Destructure data and status
  const loading = status === 'loading';
  function logoutHandler(){
    signOut()
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (  
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
