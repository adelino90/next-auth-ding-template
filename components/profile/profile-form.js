import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {
  const oldpasswordRef = useRef();
  const newpasswordRef = useRef();
  function submitHandler(event){

    event.preventDefault();
    const enteredOldPassword = oldpasswordRef.current.value;
    const enteredNewPassword  = newpasswordRef.current.value;

    ///Validation

    props.onChangePassword({
      oldPassword:enteredOldPassword,
      newPassword:enteredNewPassword
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newpasswordRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldpasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
