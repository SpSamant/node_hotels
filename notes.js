console.log("notes page loaded");
let age = 30;
const addNumber = (a,b)=>{return a+b};
const performOperation = (a,b,oprationCallback)=>{
    return oprationCallback(a,b)
}
const add=(a,b)=>{return a+b};
const sub=(a,b)=>{return a-b};
const mul=(a,b)=>{return a*b};
const div=(a,b)=>{return a/b}
const calculateCircleArea = (radius)=>{return Math.PI * radius ** 2};
module.exports = {
    age,
    addNumber,
    calculateCircleArea,
    performOperation,
    add,
    sub,
    mul,
    div
}
