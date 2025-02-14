//Mockup Data

// const health = ref({
//     max: 3,
//     current: 3,
// });

// const t = {
//     max_time: 60,
//     left_time: 10
// }

export function calResult(health, gameTime, level) {
    const score = (health.current * 25) + (gameTime.left_time / gameTime.max_time) * 25;
    console.log(score);
    if (score >= 90) {
        return {
            star: 3,
            level: level,
        }
    }
    else if (score >= 66) {
        return {
            star: 2,
            level: level,
        }
    }
    else {
        return {
            star: 1,
            level: level,
        }
    }
}