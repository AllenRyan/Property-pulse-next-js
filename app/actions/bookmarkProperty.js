
'use server';
import connectDB from '@/config/database';
import User from '@/config/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required')
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);
    let isBookmarked = user.bookmars.includes(propertyId);
    let message;
    if (isBookmarked) {
        //if already bookmarded then remove
        user.bookmars.pull(propertyId);
        message = 'Boomark Removed';
        isBookmarked = false;
    } else {
        // if not bookmarked then add
        user.bookmars.push(propertyId);
        message = 'Bookmark added'
        isBookmarked = true;
    }


    await user.save();
    revalidatePath('/properties/saved', 'page')
    return {
        message,
        isBookmarked,
    };
}

export default bookmarkProperty;