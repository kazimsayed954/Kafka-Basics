const { kafka } = require("./kafkaClient");
const group = process.argv[2];

async function init(){
    const consumer = kafka.consumer({
        groupId: group ?? "user-1"
    });
    await consumer.connect();

    await consumer.subscribe({
        topics:["rider-updates"],
        fromBeginning:true,
    });

    await consumer.run({
        eachMessage:async ({ topic, partition, message }) => {
            console.log(`[${topic}]:PARTITION:${partition} : ${message.value}`);
        }
    });
}

init();