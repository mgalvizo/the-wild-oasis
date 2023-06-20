import supabase, { supabaseUrl } from './supabase';

// The code comes from the API docs that were automatically created for this "cabins" table.
export const getCabins = async () => {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
};

export const createEditCabin = async (newCabin, id) => {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    // https://nrupjizvsjelhtwalzeb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        '/',
        ''
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Create/Edit cabin
    let query = supabase.from('cabins');

    // Create
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    }

    // Edit
    if (id) {
        // No need for the brackets ([]) here
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
    }

    // Runs the query and makes "data" available from this point on
    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be created');
    }

    // Upload image
    if (hasImagePath) {
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // Delete the cabin if there is an error with the image upload
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.error(storageError);
        throw new Error(
            'Could not upload cabin image and cabin was not created.'
        );
    }

    return data;
};

export const deleteCabin = async id => {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        // id column of the cabins table === passed id (function argument)
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }

    return data;
};
