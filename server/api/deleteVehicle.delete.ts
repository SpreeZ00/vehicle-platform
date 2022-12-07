import { Prisma } from '@prisma/client';
import prisma from '~/lib/client';

export default defineEventHandler(async (event) => {
    const { id }: Prisma.VehicleWhereUniqueInput = getQuery(event);
    const result = await prisma.vehicle.delete({
        where: { id },
    });
    return {
        result,
    };
});
