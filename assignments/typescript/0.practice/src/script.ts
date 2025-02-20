const signUpForm: HTMLFormElement | null = document.getElementById("sign-up-form") as HTMLFormElement | null

const handleSubmit = async (e: Event) : Promise<void> =>{
  e.preventDefault()

  alert("Yohooo!!!!")
}

signUpForm?.addEventListener("submit", handleSubmit)
