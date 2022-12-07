import prisma from '~/lib/client';

export default defineEventHandler(async () => {
    return await prisma.vehicle.findMany();
});
