
 class UtilsService {
     validatePasswords = (password) => {
         // Regular expression to validate the password pattern
         let isValid = false;
         const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;

         if (passwordPattern.test(password))
         {
             isValid = true;
             return isValid;
         }
         else {
             isValid =false;
             return isValid;
         }

     };
 }
 export default new UtilsService()