import { Prisma } from '@prisma/client';
import prisma from '~/lib/client';

export default defineEventHandler(async (event) => {
    const { date, mileage, amount, price }: Prisma.ReceiptCreateInput =
        await readBody(event);
    const { id, name }: Prisma.VehicleCreateWithoutReceiptsInput =
        await readBody(event);

    let d = new Date(date);

    const result = await prisma.receipt.create({
        data: {
            date: d,
            mileage: Number(mileage),
            amount: Number(amount),
            price: Number(price),
            vehicle: {
                connectOrCreate: {
                    where: {
                        id,
                    },
                    create: {
                        id,
                        mileage: Number(mileage),
                        name,
                    },
                },
            },
        },
    });
    return {
        result,
    };
});
