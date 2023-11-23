// // Subroutine to compute the right-hand sides of the system of differential equations
// function computeRightHandSides(t, y, f) {
//     f[0] = Math.sqrt((Math.pow(t,2) + Math.pow(y[0],2))) + y[1];
//     f[1] = Math.cos(2 * y[1]) + y[0];
// }
//
// // Subroutine for the Runge-Kutta method with automatic step size selection
// function rungeKuttaAutoStep(t0, y0, T, epsilon) {
//     let y = [...y0]; // Copy initial values
//     let t = t0;
//     let h = 1e-1; // Initial step size
//     console.log(h)
//     console.log(t)
//     while (t < T) {
//         let k1 = Array(2),
//             k2 = Array(2),
//             k3 = Array(2),
//             k4 = Array(2);
//         // console.log(t)
//         // Compute k1
//         computeRightHandSides(t, y, k1);
//         // console.log('k1', k1)
//         // Compute k2
//         let y2 = y.map((yi, i) => yi + (h / 2) * k1[i]);
//         computeRightHandSides(t + h / 2, y2, k2);
//
//         // Compute k3
//         let y3 = y.map((yi, i) => yi + (h / 2) * k2[i]);
//         computeRightHandSides(t + h / 2, y3, k3);
//
//         // Compute k4
//         let y4 = y.map((yi, i) => yi + h * k3[i]);
//         computeRightHandSides(t + h, y4, k4);
//
//         // Update y using the Runge-Kutta formula
//         for (let i = 0; i < 2; i++) {
//             y[i] += (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
//         }
//
//         // Estimate the error
//         let maxError = 0.0;
//         for (let i = 0; i < 2; i++) {
//             let error = Math.abs((k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) * h / 6);
//             maxError = Math.max(maxError, error);
//         }
//         // console.log(maxError < epsilon)
//         // Automatic step size selection
//         if (maxError < epsilon) {
//             h *= 2; // Increase step size
//             console.log('true')
//         } else {
//             h /= 2; // Decrease step size
//         }
//
//         t += h; // Update time
//     }
//
//     // Output results
//     console.log(`Solution for t = ${T} with precision ${epsilon}:`);
//     console.log(`y1(T) = ${y[0]}, y2(T) = ${y[1]}`);
// }
//
// // Main function
// function main() {
//     let t0 = 0.0;
//     let y0 = [0.5, 1];
//     let T = 5.0;
//
//     // Solve for epsilon = 1e-5
//     let epsilon1 = 1e-5;
//     rungeKuttaAutoStep(t0, y0, T, epsilon1);
//
//     // Solve for epsilon = 1e-6
//     let epsilon2 = 1e-6;
//     rungeKuttaAutoStep(t0, y0, T, epsilon2);
// }
//
// // Run the main function
// main();

// Subroutine to compute the right-hand sides of the system of differential equations
function computeRightHandSides(t, y, f) {
    f[0] = Math.cos(y[0] + 2 * y[1]) + 2;
    f[1] = 2 / (t + 2 * y[1] * y[1]);
}

// Subroutine for the Runge-Kutta method with automatic step size selection
function rungeKuttaAutoStep(t0, y0, T, epsilon) {
    let y = [...y0];  // Copy initial values
    let t = t0;
    let h = 1e-2;  // Initial step size
    console.log(h)
    while (t < T) {
        let k1 = Array(2), k2 = Array(2), k3 = Array(2), k4 = Array(2);

        // Compute k1
        computeRightHandSides(t, y, k1);

        // Compute k2
        let y2 = y.map((yi, i) => yi + (h / 2) * k1[i]);
        computeRightHandSides(t + h / 2, y2, k2);

        // Compute k3
        let y3 = y.map((yi, i) => yi + (h / 2) * k2[i]);
        computeRightHandSides(t + h / 2, y3, k3);

        // Compute k4
        let y4 = y.map((yi, i) => yi + h * k3[i]);
        computeRightHandSides(t + h, y4, k4);

        // Update y using the Runge-Kutta formula
        for (let i = 0; i < 2; i++) {
            y[i] += (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
        }

        // Estimate the error
        let maxError = 0.0;
        for (let i = 0; i < 2; i++) {
            let error = Math.abs((k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) * h / 6);
            maxError = Math.max(maxError, error);
        }

        // Automatic step size selection
        if (maxError < epsilon) {
            h *= 2;  // Increase step size
        } else {
            h /= 2;  // Decrease step size
        }
        // console.log('h', h)
        t += h;  // Update time
    }

    // Output results
    console.log(`Solution for t = ${T} with precision ${epsilon}:`);
    console.log(`y1(T) = ${y[0]}, y2(T) = ${y[1]}`);
}

// Main function
// function main() {
//     let t0 = 0.0;
//     let y0 = [0.5, 1.0];
//     let T = 5.0;
//
//     // Solve for epsilon = 1e-5
//     let epsilon1 = 1e-5;
//     rungeKuttaAutoStep(t0, y0, T, epsilon1);
//
//     // Solve for epsilon = 1e-6
//     let epsilon2 = 1e-6;
//     rungeKuttaAutoStep(t0, y0, T, epsilon2);
// }

// Run the main function
main();


function simpleIteration(x0, eps) {
    let n = 0;
    let x = x0;
    let xNext = f(x);
    let error = Math.abs(xNext - x);

    while (error > eps) {
        console.log(`n = ${n}, x = ${x}, xNext = ${xNext}, різниця = ${error}`);
        x = xNext;
        xNext = f(x);
        error = Math.abs(xNext - x);
        n += 1;
    }

    console.log(`x = ${x}, f(x) = ${f(x)}`);
}

function f(x) {
    return Math.tan(x) - x ** 2 - 0.5;
}

// Example usage
function main() {
    // Bisection method call
    const a = 0;
    const b = 1;
    const epsBisection = 1e-3;

    // Simple iteration method call
    const x0 = 0.5;
    const epsIteration = 1e-3;
    console.log("Метод простої ітерації:");
    simpleIteration(x0, epsIteration);
}
main()
