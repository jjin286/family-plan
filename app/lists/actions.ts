"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache'


// *********************** LIST ***********************
//TODO:
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
//TODO:
export async function getListById(id : number){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lists")
    .select()
    .eq('id', id);

  if (error) {
    console.log(error)
  }

  return data[0];
}
//TODO:
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
//TODO:
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
//TODO:
export async function updateList(id : number, name : string, description: string){
  const supabase = await createClient();

  const { error } = await supabase
    .from('lists')
    .update({ name: name, description: description })
    .eq('id', id);

  if (error) {
    console.log(error)
  }

  revalidatePath('/lists')
}



// *********************** ITEM ***********************
//TODO:
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
//TODO:
export async function createItem(listId : number, text : string, note: string){
  const supabase = await createClient();

  const { error } = await supabase
    .from('list_items')
    .insert({ text : text , note : note, list_id : listId, check : false});

  if (error) {
    console.log(error)
  }

  revalidatePath(`/lists/${listId}`)
}
//TODO:
export async function updateItem(listId : number, id : number, text : string, note: string, check : boolean){
  const supabase = await createClient();

  const { error } = await supabase
    .from('list_items')
    .update({ text: text, note: note, check: check })
    .eq('id', id);

  if (error) {
    console.log(error)
  }

  revalidatePath(`/lists/${listId}`)
}

//TODO:
export async function deleteItem(listId : number, id : number){
  const supabase = await createClient();

  const { error } = await supabase
  .from('list_items')
  .delete()
  .eq('id', id);

  if (error) {
    console.log(error)
  }

  revalidatePath(`/lists/${listId}`)
}