"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache'

// *********************** FAMILY ***********************
export async function getFamilyById(familyId : number){
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("familys")
      .select()
      .eq("id", familyId);

    if (error) {
      console.log(error)
    }

    return data![0];
  }

// *********************** ANNOUNCEMENTS ***********************
//TODO:
export async function getFamilyAnnouncements(familyId : number){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("announcements")
    .select()
    .eq("family_id", familyId);

  if (error) {
    console.log(error)
  }

  return data ?? [];
}

//TODO:
export async function createAnnouncement(familyId : number, title : string, text: string){
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('announcements')
    .insert({ "family_id" : familyId, 'title' : title, 'text': text, "user_id": user.id });

  if (error) {
    console.log(error)
  }

  revalidatePath(`/family/${familyId}`)
}

//TODO:
export async function deleteAnnouncement(familyId : number, id : number){
  const supabase = await createClient();

  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error)
  }

  revalidatePath(`/family/${familyId}`)
}


