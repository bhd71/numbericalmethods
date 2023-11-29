// Підпрограма-процедура для обчислення значень правих частин системи диференціальних рівнянь
function computeRightHandSides(t, y, f) {
    f[0] = Math.sqrt((Math.pow(t,2) + Math.pow(y[0],2))) + y[1];
    f[1] = Math.cos(2 * y[1]) + y[0];
}

// Підпрограма-процедура для методу Рунге-Кутта з автоматичним вибором кроку
function rungeKuttaAutoStep(t0, y0, T, epsilon) {
    let y = [...y0]; // Copy initial values
    let t = t0;
    let h = 1e-4; // Initial step size

    while (t < T) {
        let k1 = Array(2),
            k2 = Array(2),
            k3 = Array(2),
            k4 = Array(2);

        computeRightHandSides(t, y, k1);

        let y2 = y.map((yi, i) => yi + (h / 2) * k1[i]);
        computeRightHandSides(t + h / 2, y2, k2);

        let y3 = y.map((yi, i) => yi + (h / 2) * k2[i]);
        computeRightHandSides(t + h / 2, y3, k3);

        let y4 = y.map((yi, i) => yi + h * k3[i]);
        computeRightHandSides(t + h, y4, k4);

        for (let i = 0; i < 2; i++) {
            y[i] += (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
        }

        let maxError = 0.0;
        for (let i = 0; i < 2; i++) {
            let error = Math.abs((k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) * h / 6);
            maxError = Math.max(maxError, error);
        }

        if (maxError < epsilon) {
            h *= 2; // Increase step size
        } else {
            h /= 2; // Decrease step size
        }

        t += h; // Update time
    }

    // Output results
    console.log(`Solution for t = ${5} with precision ${epsilon}:`);
    console.log(`y1(T) = ${y[0]}, y2(T) = ${y[1]}`);
}

// Main function
let t0 = 0.0;
let y0 = [0.5, 1];
let T = 3.5;
// Рішення для епсилон = 1e-5
let epsilon1 = 1e-5;
rungeKuttaAutoStep(t0, y0, T, epsilon1);

// Рішенння для епсилон = 1e-6
let epsilon2 = 1e-6;
rungeKuttaAutoStep(t0, y0, T, epsilon2);

