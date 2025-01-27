import { getSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function AuthPage(props) {
  const [isLoading,setisLoading] = useState(true);
  const router = useRouter();
  useEffect(()=>{
    getSession().then(session =>{
      if(session){
        router.replace('/')
      }
      else{
        setisLoading(false)
      }
    })
  },[router])
  if(isLoading){
    return <p>...Loading</p>
  }
  return <AuthForm />;
}

// export async function getServerSideProps(context){
//   const session = await getSession({req:context.req});

//   if(session){
//     return {
//       redirect:{
//         destination:'/profile',
//         permanent:false
//       }
//     }
//   }
//   return{
//     props:{ session },
//   }
// }
export default AuthPage;
