//y``= f(x,y,y`)
function derivative(t, y, yp) {
    // Given second-order ODE: y'' + 2y' + 5y = 3sin(2t)
    // Convert it into a single second-order ODE: y'' = 3sin(2t) - 2y' - 5y
    return 3 * Math.sin(2 * t) - 2 * yp - 5 * y;
}
//y``= f(x,y)
function f(t,y) {
    return  3 * Math.sin(2 * t)  - 5 * y;
}

// Коефіцієнти для методу Нюстрьома
const c = [0, 1/2, 1/2, 1];
const a = [
    [0,   0,   0,   0],
    [1/8, 0,   0,   0],
    [0,   1/8, 0,   0],
    [0,   0,   1/2, 0]
];
const b = [1/6, 1/6, 1/6, 1/2];

// Коефіцієнти для методу Нюстрьома для y``= f(x,y)
const aa = [[0], [1/2], [0, 1/2], [0, 0, 1]];
const bb = [1/6, 1/3, 1/3, 1/6];
const cc = [0, 1/2, 1/2, 1];
function rungeKuttaNystrom(t, y, yp, h, func) {
    const k = new Array(c.length);

    // Розрахунок k-коефіцієнтів
    for (let i = 0; i < c.length; i++) {
        let sumA = 0;
        let sumB = 0;

        for (let j = 0; j < i; j++) {
            sumA += a[i][j] * k[j];
            sumB += b[j] * k[j];
        }

        const ti = t + c[i] * h;
        const yi = y + h * sumA;
        const ypi = yp + h * sumB;

        k[i] = func(ti, yi, ypi);
    }

    // Розрахунок наступних значень y та yp
    let deltaY = 0;
    let deltaYp = 0;

    for (let i = 0; i < c.length; i++) {
        deltaY += b[i] * k[i];
        deltaYp += k[i];  // В оригіналі методу Нюстрьома береться сума без множників b[i]
    }

    return [y + h * deltaY, yp + h * deltaYp];
}
function rungeKuttaNystromWithoutYp(t, y, yp, h, func) {
    const k = new Array(4);



    // Розрахунок k-коефіцієнтів
    for (let i = 0; i < k.length; i++) {
        let sumA = 0;
        for (let j = 0; j < i; j++) {
            sumA += aa[i][j] * k[j];
        }

        const ti = t + cc[i] * h;
        const yi = y + h * yp + h * h * sumA / 2;

        k[i] = func(ti, yi);
    }

    // Розрахунок наступного значення y та yp
    let deltaY = h * yp + h * h * (bb[0] * k[0] + bb[1] * k[1] + bb[2] * k[2] + bb[3] * k[3]) / 2;
    let deltaYp = h * (bb[0] * k[0] + bb[1] * k[1] + bb[2] * k[2] + bb[3] * k[3]);

    return [y + deltaY, yp + deltaYp];
}

function rungeKutta(t, y, yp, h, func) {
    // Розрахунок k для yp (першої похідної y)
    const k1_yp = h * func(t, y, yp);
    const k2_yp = h * func(t + 0.5 * h, y + 0.5 * k1_yp, yp + 0.5 * k1_yp);
    const k3_yp = h * func(t + 0.5 * h, y + 0.5 * k2_yp, yp + 0.5 * k2_yp);
    const k4_yp = h * func(t + h, y + k3_yp, yp + k3_yp);

    // Розрахунок k для y (значення функції)
    const k1_y = h * yp;
    const k2_y = h * (yp + 0.5 * k1_yp);
    const k3_y = h * (yp + 0.5 * k2_yp);
    const k4_y = h * (yp + k3_yp);

    // Розрахунок нових значень y та yp
    const dy = y + (k1_y + 2 * k2_y + 2 * k3_y + k4_y) / 6;
    const dyp = yp + (k1_yp + 2 * k2_yp + 2 * k3_yp + k4_yp) / 6;

    return [dy, dyp];
}

// Initial conditions
const initialT = 0
const T = 15;
const initialY = 0;
const initialYp = 2;


const h = 1e-4;


// let t = initialT;
let y = initialY;
let yp = initialYp;


runMethod(rungeKuttaNystrom, 'runge Kutta nystorm method y``= f(x,y,y`)', derivative)
runMethod(rungeKutta, 'runge Kutta method y``= f(x,y,y`)', derivative)

runMethod(rungeKuttaNystrom, 'runge Kutta nystorm method y``= f(x,y)', f)
runMethod(rungeKuttaNystromWithoutYp, 'optimized Runge-Kutta nystrom method:', f)
runMethod(rungeKutta, 'runge Kutta method y``= f(x,y)', f)


function runMethod(method, name, func) {
    const res = []
    let iteration = 0
    console.time(name)
    for (let t = initialT; t <= T; t += h) {
        res.push(method(t, y, yp, h, func));
        iteration++
    }


    console.timeEnd(name)

    const lastValue = res[res.length-1];
    console.log("Last value at t = " + T + ": y = " + lastValue[0] + ", yp = " + lastValue[1]);
    console.log()

}

