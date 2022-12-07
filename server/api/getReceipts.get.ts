import { Prisma } from '@prisma/client';
import prisma from '~/lib/client';

export default defineEventHandler(async (event) => {
    const { vehicleId }: Prisma.ReceiptWhereInput = getQuery(event);

    return await prisma.receipt.findMany({
        where: { vehicleId },
    });
});
