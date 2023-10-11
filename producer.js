const { kafka } = require("./kafkaClient");
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

async function init(){
    const producer = kafka.producer();
    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer Connected Successfully");

    rl.setPrompt("Input >:");
    rl.prompt();

    rl.on('line',async function(line){
        const [riderName, location] = line?.split(" ");
        await producer.send({
            topic:'rider-updates',
            messages:[
                {
                    partition:location?.toLowerCase() === "north" ? 0 : 1,
                    key:'location-update',
                    value:JSON.stringify({riderName,location})
                }
            ]
        });
    }).on('close',async ()=>{
        await producer.disconnect();
    })


    // await producer.send({
    //     topic:'rider-updates',
    //     messages:[
    //         {
    //             partition:0,
    //             key:'location-update',
    //             value:JSON.stringify({name:'John Doe',location:"SOUTH"})
    //         }
    //     ]
    // });

    // await producer.disconnect();

}

init();