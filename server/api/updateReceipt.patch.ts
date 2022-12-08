import { Prisma } from '@prisma/client';
import prisma from '~/lib/client';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { mileage, amount, price }: Prisma.ReceiptCreateInput = body;
    const { id }: Prisma.ReceiptWhereUniqueInput = body;
    const { date } = body;


    const result = await prisma.receipt.update({
        data: {
            date: new Date(date),
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
