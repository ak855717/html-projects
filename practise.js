let objA = { name: "Alice", age: 26, city: "San Francisco" } ;

let objB = { name: "Alice", age: 26, city: "New York" } ;

let objC = { name: "Bob", age: 30, city: "New York" } ;

const areOjbectsEqual = () => {
    return Object.keys(objA) === Object.keys(objB) ? true : false;
} // true

console.log(areOjbectsEqual());
