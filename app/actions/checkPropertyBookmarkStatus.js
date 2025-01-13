'use server';
import connectDB from '@/config/database';
import User from '@/config/models/User';
import { getSessionUser } from '@/utils/getSessionUser';


async function checkBookmarkStatus({propertyId}) {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required')
    }
    const { userId } = sessionUser;
    const user = await User.findById(userId)
    let isBookmarked = user.bookmars.includes(propertyId);

    return { isBookmarked };
}

export default checkBookmarkStatus;