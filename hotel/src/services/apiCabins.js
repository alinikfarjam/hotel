import supabase from "./supabase";

export async function getCabins() {

    let { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.log(error);
        throw new Error('could not be loaded any cabin');

    }
    return data;
}

export async function deleteCabin(id) {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.log(error);
        throw new Error('could not be loaded any cabin');

    }
    return data;
}