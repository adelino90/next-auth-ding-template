import { useEffect, useState } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { toast } from 'react-hot-toast';
import { getSession } from 'next-auth/react';
function UserProfile(props) {
  // Redirect away if NOT auth
  const [isLoading,setisLoading] = useState(true);

  // useEffect(()=>{
  //   getSession().then(session=>{
  //     if(!session){
  //       window.location.href = '/auth';
  //     }else{setisLoading(false)}
      
  //   });
  // },[]);
 
  // if(isLoading){
  //   return <p className={classes.profile}>...Loading</p>
  // }
  // async function changePasswordHandler(passwordData){

  //   const toastId = toast.loading('Loading...');
  //   const response = await fetch('/api/user/change-password',{
  //     method:'PATCH',
  //     body:JSON.stringify(passwordData),
  //     headers:{
  //       'Content-Type':'application/json'
  //     }
  //   })
  //   const data = await response.json();

  //   if(!data.result){
  //     toast.error(data.message);
  //     toast.dismiss(toastId)
  //     return false
  //   }
  //   else{
  //     toast.success(data.message);
  //     toast.dismiss(toastId)
  //   }
    
  //   return true
  // }
  
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword = {props.changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
