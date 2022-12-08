import { Prisma } from '@prisma/client';
import prisma from '~/lib/client';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { date, mileage, amount, price }: Prisma.ReceiptCreateInput =
        body;
    const { id, name }: Prisma.VehicleCreateWithoutReceiptsInput =
        body;

    const result = await prisma.receipt.create({
        data: {
            date: new Date(date),
            mileage: Number(mileage),
            amount: Number(amount).toFixed(2),
            price: Number(price).toFixed(3),
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
