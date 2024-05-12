const network = document.body.appendChild(
    document.createElement("com-network")
);

const chain0 = document.createElement("com-chain").signal("new");
const chain1 = document.createElement("com-chain").signal("new");

network.append(chain0, chain1);

const module00 = document
    .createElement("com-module")
    .signal("insert")
    .setOperatorType("lfo")
    .setOperatorParameters([50, 10]);

// module00.setOperatorParameters()

const module01 = document.createElement("com-module").setOperatorType("lfo");

const module02 = document.createElement("com-module");

chain0.append(module00, module01, module02);

console.log("\n");

module01.setOperatorParameters([10, 20], true);

module02.setOperatorParameters([]);

// module02.setOperatorParameters([1,2,3])

// module01.setOperatorType("pth");

// module02.setOperatorType("lfo");

// const module10 = document.createElement("com-module").signal("insert");
// const module11 = document
//     .createElement("com-module")
//     .setOperatorType("lfo")
//     .signal("insert");
// const module12 = document.createElement("com-module").signal("insert");

// chain1.append(module10, module11, module12);

// setInterval(() => {
//     let rand0 = Math.random() * 100;
//     let rand1 = Math.random() * 100;

//     console.log("\n");
//     module00.setOperatorParameters([rand0, rand1], true);
// }, 500);
