import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
function ProfilePage(props) {

  async function changePasswordHandler(passwordData){
    const toastId = toast.loading('Loading...');
    const response = await fetch('/api/user/change-password',{
      method:'PATCH',
      body:JSON.stringify(passwordData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();

    if(!data.result){
      toast.error(data.message);
      toast.dismiss(toastId)
      return false
    }
    else{
      toast.success(data.message);
      toast.dismiss(toastId)
    }
    return true
  }

  return <UserProfile changePasswordHandler = {changePasswordHandler}/>;
}

export async function getServerSideProps(context){
  const session = await getSession({req:context.req});

  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false
      }
    }
  }
  return{
    props:{ session },
  }
}

export default ProfilePage;
