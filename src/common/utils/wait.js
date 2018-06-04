const wait = (request, time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(request);
        }, time);
    })
};

export default wait;
