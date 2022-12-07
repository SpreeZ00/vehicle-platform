import { Prisma } from '@prisma/client';
import prisma from '~/lib/client';

export default defineEventHandler(async (event) => {
    const { date, mileage, amount, price }: Prisma.ReceiptUpdateInput =
        await readBody(event);

    const { id }: Prisma.ReceiptWhereUniqueInput = await readBody(event);

    const result = await prisma.receipt.update({
        data: {
            date,
            mileage,
            amount,
            price,
        },
        where: {
            id,
        },
    });
    return {
        result,
    };
});
