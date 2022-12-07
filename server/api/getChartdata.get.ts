import prisma from '~/lib/client';

function getRandomColor() {
    const red = Math.floor(((1 + Math.random()) * 256) / 2);
    const green = Math.floor(((1 + Math.random()) * 256) / 2);
    const blue = Math.floor(((1 + Math.random()) * 256) / 2);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

export default defineEventHandler(async () => {
    let labels: string[] = [];
    let data: number[] = [];
    let backgroundColor: string[] = [];

    const chartData = await prisma.vehicle.findMany({
        select: {
            name: true,
            receipts: {
                select: {
                    mileage: true,
                },
            },
        },
    });

    console.log(chartData);
    chartData.forEach((vehicle) => {
        labels.push(vehicle.name);
        backgroundColor.push(getRandomColor());
        if (vehicle.receipts.length > 0) {
            data.push(vehicle.receipts[vehicle.receipts.length - 1].mileage);
        } else {
            data.push(0);
        }
    });

    return {
        labels: labels,
        datasets: [
            {
                data,
                backgroundColor,
                hoverOffset: 4,
            },
        ],
    };
});
