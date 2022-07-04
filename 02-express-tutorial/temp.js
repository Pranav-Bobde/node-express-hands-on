const comb = (arr) => {
    if(arr.length == 0) return [[]];

    const firstEl = arr[0];
    const rest = arr.slice(1);

    const combWithout = comb(rest);
    const combWithFE = []
    combWithout.forEach((c) => {
        const cwithfe = [...c, firstEl];
        combWithFE.push(cwithfe);
    })

    return [...combWithout, ...combWithFE];
}

const permutations = (arr) => {
    if(arr.length == 0) return [[]];

    const firstEl = arr[0];
    const rest = arr.slice(1);

    const permutationsWithout = permutations(rest);
    const permutationsWith = [];
    permutationsWithout.forEach((p) => {
        for(let i=0; i<=p.length; i++){
            const perm = [...p.slice(0, i), firstEl, ...p.slice(i)];
            permutationsWith.push(perm);
        }
    })

    return [...permutationsWith];
}




// console.log(comb([]))
// console.log(comb(['c']))
// console.log(comb(['b', 'c']))
// console.log(comb(['a','b','c']))
console.log(permutations(['a','b','c']))