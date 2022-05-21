import { db } from '../../firebase/firebase'
import { collection, where, getDocs, query } from 'firebase/firestore'

export default class UserService {
  static getUserByID = async (userID) => {
    const peopleRef = collection(db, 'users')
    const wherePeople = where('uid', '==', `${userID}`)
    const user = query(peopleRef, wherePeople)

    let array = []
    const querySnapshot = await getDocs(user) 
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
    })

    return array[0]
  }

  static setUidOnAccountCreation = async () => {
    return
  }
}