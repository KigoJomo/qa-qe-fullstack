// a boolean is a true of false value
const isAdmin = true
const isStudent = false

function showPaymentsModule(args){
  if(args === true){
    // show payment details
    console.log("You have the access rights to the payments page")
  } else{
    // show PageNotAuthorized
    console.log("You don't have have the access rights to the payments page")
  }
}

showPaymentsModule(isAdmin)
showPaymentsModule(isStudent)

console.log(6 === 6) //true
console.log('6' === 6) //false