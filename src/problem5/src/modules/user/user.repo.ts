import { DB } from '@/database';
import { User } from '@/interfaces/user.interface';

export const repo = {
    getUserProfile: async (
        userId: string | undefined,
    ): Promise<User | null> => {
        return await DB.Users.findOne({ where: { id: userId } });
    },
};
