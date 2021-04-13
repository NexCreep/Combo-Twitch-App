
async function timeEvent(durationTillEvent, callback){
    var actualTime = 0
    var actualSeg = new Date().getSeconds()
    var prevSeg = null

    while (actualTime <= durationTillEvent) {
        if (actualSeg != prevSeg) {
            actualTime++
        }
        prevSeg = actualSeg
        actualSeg = new Date().getSeconds()

    };

    callback()
}

module.exports.timeEvent = timeEvent;


/*CALL TO TEST FUNCTION*/
// if (require.main === module){
//     timeEvent(20, () => {
//         console.log('Event started');
//     })
// }