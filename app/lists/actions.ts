"use server";

import { createClient } from "@/utils/supabase/server";

export async function getListItems(id : number){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("list_items")
    .select()
    .eq("list_id", id);

  if (error) {
    console.log(error)
  }

  return data;
}

export async function getLists(){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lists")
    .select();

  if (error) {
    console.log(error)
  }

  return data;
}

export async function createList(name : string){
  const supabase = await createClient();

  const { error } = await supabase
    .from('lists')
    .insert({ name: name });

  if (error) {
    console.log(error)
  }
}
