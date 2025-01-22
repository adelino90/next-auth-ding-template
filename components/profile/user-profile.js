import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

function UserProfile() {
  // Redirect away if NOT auth
  const [isLoading,setisLoading] = useState(true);

  useEffect(()=>{
    getSession().then(session=>{
      if(!session){
        window.location.href = '/auth';
      }else{setisLoading(false)}
      
    });
  },[]);
 
  if(isLoading){
    return <p className={classes.profile}>...Loading</p>
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
