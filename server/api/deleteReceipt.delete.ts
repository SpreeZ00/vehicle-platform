import { Prisma } from '@prisma/client';
import prisma from '~/lib/client';

export default defineEventHandler(async (event) => {
    const { id }: Prisma.ReceiptWhereUniqueInput = await getQuery(event);

    const result = await prisma.receipt.delete({
        where: {
            id,
        },
    });
    return {
        result,
    };
});
