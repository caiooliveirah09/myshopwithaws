import UserPool from "@/UserPool"

export const getSession = async (): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if(user) {
      user.getSession((err, session) => {
        if(err) {
          reject(false);
        } else {
          resolve(session);
        }
      })
    } 
    reject(false);
  })
}