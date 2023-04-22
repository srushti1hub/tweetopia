import {getProviders, signIn,useSession} from 'next-auth/react'
import { useRouter } from 'next/router';
export default function Login({providers}){
    const {data,status} = useSession();
    const router = useRouter();
    if(status === 'loading'){
        return '';
    }
    if(data){
        router.push('/');
    }
    return(
    <div className='flex items-center justify-center flex-col h-screen space-y-10'>
        <div>
        <img className='mx-auto' src='./logo-twitter.png'></img>
        </div>
        <div className='text-3xl font-bold'>Sign in to Tweetopia</div>
        <div className='space-y-5'>
            {Object.values(providers).map( provider =>(
            <div key={provider.id}>
                <button onClick={async() => { await signIn(provider.id)}} className='rounded-full px-14 py-2 bg-twitterWhite text-stone-950 flex items-center'>
                {provider.id === 'google' && (<img src='./logo-google.png' alt='Google' className='h-6 pr-2' />)}
                {provider.id === 'apple' && ( <img src='./logo-apple.png' alt='Apple' className='h-6 pr-2' />)}
                Sign up with {provider.name}
                </button>
            </div>
            ))}
        </div>
    </div>
    );
}

export async function getServerSideProps(){
    const providers = await getProviders();
    return{
        props: {providers},
    }
}