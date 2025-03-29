"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache'


// *********************** LIST ***********************
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

  revalidatePath('/lists')
}

export async function deleteListById(id : number){
  const supabase = await createClient();

  const { error } = await supabase
    .from('lists')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error)
  }

  revalidatePath('/lists')
}

export async function updateList(id : number, name : string){
  const supabase = await createClient();
  console.log("Submitted")
  if (!id) {
    console.error("Invalid ID provided for update.");
  }

  console.log("Updating list with ID:", id, "New Name:", name);

  

  const { error } = await supabase
    .from('lists')
    .update({ name: name })
    .eq('id', id);

  if (error) {
    console.log(error)
  }
  console.log("Ran edit", error)
  revalidatePath('/lists')
}



// *********************** ITEM ***********************

export async function getItems(id : number){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("list_items")
    .select()
    .eq("list_id", id);

  if (error) {
    console.log(error)
  }

  return data ?? [];
}

// export async function createItem(formData: FormData) {
//   const name = formData.get('name');

//   const supabase = createClient();

//   const { error } = await supabase
//     .from('list_items')
//     .insert({ text : text , note : note, list_id : listId, check : check});

//   if (error) {
//     console.log(error)
//   }

// }

export async function deleteItem(id : number){
  const supabase = await createClient();

  const { error } = await supabase
  .from('list_items')
  .delete()
  .eq('id', id);

  if (error) {
    console.log(error)
  }
}