import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getUser(){
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    // if (error || !data?.user) {
    //     redirect('/login')
    // }
    if(error){
        console.log(error);
    }

    return user;
}