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

console.log(6 === 6) // true
console.log('6' === 6) // false
console.log('6' !== 6) // true
console.log('6' != 6) // false

import bcrypt from 'bcrypt'

const password = 'Qfd34nr34!ed'
const password2 = 'DF458ufh85y4!ed'
const hashedPassword = bcrypt.hashSync(password, 10)
console.log(hashedPassword)

const comparePassword = bcrypt.compareSync(password, hashedPassword)
function auth(){
  if(comparePassword === true){
    console.log("> Login Success")
  } else{
    console.log("> Login Failed")
  }

  comparePassword && console.log('\tWelcome')
}
auth()