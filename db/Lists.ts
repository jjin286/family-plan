import { createClient } from "@/utils/supabase/client";
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
//TODO:
export interface Item{
  created_at: string;
  id: number;
  list_id: number;
  text: string | null;
  note: string | null;
  check: boolean | null;
}
//TODO:
export interface Items extends Array<Item>{}
//TODO:
export interface List{
  created_at: string;
  id: number;
  name: string;
  description: string;
};
//TODO:
export async function getListItems(id : number) : Promise<Item[]>{
  const supabase = createClient();

  const { data , error } = await supabase
    .from("list_items")
    .select("*")
    .eq("list_id", id);

  if (error) {
    console.log(error)
    return [];
  }

  return data ?? [];
}
//TODO:
export async function getLists(){
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lists")
    .select();

  if (error) {
    console.log(error)
  }

  return data;
}
//TODO:
export async function createList(name : string){
  const supabase = createClient();

  const { error } = await supabase
    .from('lists')
    .insert({ name : name });

  if (error) {
    console.log(error)
  }
}
//TODO:
export async function createItem(listId : number, text : string, note : string, check : boolean){
  const supabase = createClient();

  const { error } = await supabase
    .from('list_items')
    .insert({ text : text , note : note, list_id : listId, check : check});

  if (error) {
    console.log(error)
  }
}
//TODO:
export async function checkItem(listId : number, check : boolean){
  const supabase = createClient();

  const { error } = await supabase
    .from('list_items')
    .update({ check: check })
    .eq('id', listId);

  if (error) {
    console.log(error)
  }
}
//TODO:
export async function deleteItem(id : number){
  const supabase = createClient();

  const { error } = await supabase
    .from('list_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error)
  }
}
//TODO:
export async function deleteListById(id : number){
  const supabase = createClient();

  const { error } = await supabase
    .from('lists')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error)
  }

}
