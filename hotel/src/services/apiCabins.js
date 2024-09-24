import supabase, { supabaseUrl } from "./supabase";

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

export async function createEditCabin(newCabin, id) {
    const hasImagePath = String(newCabin.image).includes(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;


    // create/edit a new cabin
    let query = supabase.from('cabins')

    //create 
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }])
    }


    //edit
    if (id) {
        console.log(imagePath)
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
    }



    const { data, error } = await query.select().single()

    if (error) {
        console.log(error);
        throw new Error('could not be loaded any cabin');

    }

    if (hasImagePath) return data;
    //upload image    
    const { error: imageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    //delete the cabin if there was an error uploading image
    if (imageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);

        console.log(error);
        throw new Error('could not be uploaded the image and the cabin was not created');

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