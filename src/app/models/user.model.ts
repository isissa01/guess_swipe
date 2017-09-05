export interface User {
  uid: string,
  photoURL: string,
  email: string,
  name: string,
  messages : object[],
  friends : object[],
  timestamp: any
}
