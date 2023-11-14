export const isAgeValid = (age:string) => {
  let ageNumber: number = parseInt(age);
      if(ageNumber >= 10) {  
  return (true);
      }
      return (false)
  }