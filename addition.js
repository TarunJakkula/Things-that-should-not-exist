const toNumber = (a) => {
  if(a === '0') return 0;
  if(a === '1') return 1;
  throw new Error(`${a} is not a binary!`);
}

const toBinary = (a) => {
  if(typeof a !== "number") 
    throw new Error(`${a}(${typeof a}) is not a number!`);
  if(a<0)
    throw new Error(`${a} is not a whole number!`);
  let binary = '';
  do {
    binary=a%2+binary;
    a=Math.floor(a/2);
  } while(a!=0);
  return binary;
}

const fromBinary = (a) => {
  if(typeof a !== "string")
    throw new Error(`${a}(${typeof a}) is not a string!`);
  const array = a.split('').reverse().map(toNumber)
  let multiplier = 1;
  let number = 0;
  for(let i in array){
    number += array[i]*multiplier;
    multiplier *= 2;
  }
  return number;
}

function add (a,b){
  const A = toBinary(a).split('').reverse();
  const B = toBinary(b).split('').reverse();
  let add = '';
  let carry = 0;
  let min = Math.min(A.length, B.length);
  let i = 0;
  for(i = 0; i< min;i++){
    const n1 = toNumber(A[i]);
    const n2 = toNumber(B[i]);
    add += n1 ^ n2 ^ carry;
    carry = (n1 + n2 + carry) >= 2 ? 1 : 0;
  }
  if(A.length>B.length){
    for(;i<A.length;i++){
      const n1 = toNumber(A[i]);
      add += n1 ^ carry;
      carry = (n1 + carry) >= 2 ? 1 : 0;
    }
  } else {
    for(;i<B.length;i++){
      const n1 = toNumber(B[i]);
      add += n1 ^ carry;
      carry = (n1 + carry) >= 2 ? 1 : 0;
    }
  }
  if(carry) add += carry;
  add = add.split('').reverse().join('');
  return fromBinary(add);
}

function addForInsane(a,b){
  const A = fromBinary(toBinary(a));
  const B = fromBinary(toBinary(b));
  return A+B;
}

console.log(add(18,2))
console.log(addForInsane(2,2003))
