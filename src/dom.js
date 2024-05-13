export function waitForMicroTasks() {
    return new Promise(res => {
        requestAnimationFrame(res)
    })
}