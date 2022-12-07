import prisma from '~/lib/client';
import { Prisma } from '@prisma/client';

export default defineEventHandler(async (event) => {
    const { id }: Prisma.VehicleWhereUniqueInput = getQuery(event);
    return await prisma.vehicle.findUnique({
        where: { id },
    });
});
