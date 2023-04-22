import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UsernameForm(){
    const {userInfo,status} = useUserInfo();
    const [username,setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        if(status === 'loading'){
            return;
        }
        if(username === ''){
            const defaultUsername = userInfo?.email?.split('@')[0];
            setUsername(defaultUsername.replace(/[^a-z]+/gi,''));
        }
    },[status]);

    async function handleFormSubmit(e){
        e.preventDefault();
        await fetch('api/users',{
            method: 'PUT',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({username}),
        });
        router.reload();
    }

    if(status === 'loading'){
        return '';
    }

    return(
        <div className="flex h-screen items-center justify-center">
            <form className="text-center" onSubmit={handleFormSubmit}>
                <div className="text-center space-y-5">
                    <div>
                        <img className='mx-auto' src='./logo-twitter.png'></img>
                    </div>
                    <h1 className="text-3xl font-bold">Pick a Username</h1>
                    <input type="text" className="bg-black w-full border-2 p-3 border-twitterBlue" placeholder={'username'} value={username} onChange={e => {setUsername(e.target.value)}}/>
                    <button className="block w-full rounded-full p-3 bg-twitterWhite text-stone-950 font-bold">Continue</button>
                </div>
            </form>
        </div>
    );
}