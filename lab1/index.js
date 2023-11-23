const f1 = (t) => Math.exp( - Math.pow(t,2)) * Math.cos(0.8 * t)
const f2 = (t) => Math.exp(2*t -3)


// Function to define the exact solution
function u_exact(t) {
    return f1(t) * f2(t) + 2 * (t - 2);
}

// Parameters
const t0 = 1.0;
const T = 6.0;
const y0 = 10.0;
const eps = 1e-6;
const epsM = 1e-6;

let t = t0;
let y = y0;
let tau = 0.5;
let e_max = 0.0;
let E, tau_H = 0.0;
let iter = 1;
let pr1 = false;
let v = y;
let t1 = t;

// Function for numerical solution
function rkt(t, y, h) {
    const g = 2 * (t - 2);

    const k1 = h * (f1(t) * f2(t) - g * y);
    const k2 = h * (f1(t+h/2) * f2(t+h/2) - g * (y + k1 / 2));
    const k3 = h * (f1(t+h) * f2(t+h) - g * (y - k1 + 2 * k2));

    return y + (k1 + 4 * k2 + k3) / 6;
}

// Arrays to store values
const t_exact = [t0];
const u_exact_values = [u_exact(t0)];
const t_values = [t0];
const y_values = [y0];

// Numerical solution loop
while (Math.abs(T - t) >= epsM) {
    if (pr1) {
        v = y;
        t1 = t;
        pr1 = false;
    }

    if ((t + tau) >= T) {
        tau = T - t;  // Adjust the step size at the final time
    }

    y = rkt(t, y, tau);
    const w = y;
    y = v;
    tau = tau / 2.0;
    y = rkt(t, y, tau);
    t = t + tau;
    y = rkt(t, y, tau);
    E = (Math.abs(y - w)) / (7.0 * Math.max(1.0, Math.abs(y)));
    tau_H = 2 * tau * Math.min(5.0, Math.max(0.1, 0.9 * Math.pow((eps / E), 1.0 / 4.0)));

    if (E <= eps) {
        pr1 = true;
        t = t + tau;
        y = y + (y - w) / 3.0;
        iter += 1;
        tau = tau_H;
    } else {
        const u = u_exact(t);
        t_values.push(t);
        y_values.push(y);
        u_exact_values.push(u);

        if (e_max < Math.abs(y - u)) {
            e_max = Math.abs(y - u);
        } else {
            y = v;
            t = t1;
            tau = tau_H;
            t_exact.push(t);
        }
    }
}


// Output results
for (let i = 0; i < t_values.length; i++) {
    const t = t_values[i];
    const y = y_values[i];
    const u = u_exact_values[i];
    console.log(`t = ${t.toFixed(15)}\ty = ${y.toFixed(15)}\tu = ${u.toFixed(15)}\t|u(t)-y| = ${Math.abs(u - y).toFixed(15)}`);
}

console.log(`e_max = ${e_max.toFixed(9)}`);
console.log(`iterations = ${iter}`);


