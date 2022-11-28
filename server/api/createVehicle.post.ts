import { Prisma } from "@prisma/client";
import prisma from "~~/lib/client";

export default defineEventHandler(async (event) => {
    const { name, mileage }: Prisma.VehicleCreateInput = await readBody(event);
    
    const result = await prisma.vehicle.create({
        data:  {
            name,
            mileage: Number(mileage),
        },
    });
    return {
        result,
    };
})