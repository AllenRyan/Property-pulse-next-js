'use server'
import ConnectDB from "@/config/database";
import Message from "@/config/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


async function addMessage(previousState, formData){
  await ConnectDB()
  const sessionUser = await getSessionUser()

  if(!sessionUser || !sessionUser.userId){
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;
  const recipient = formData.get('recipient')

    if (userId === recipient) {
      return {error: 'You can not send message to yourself'}
    }
    const newMessage = new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        body: formData.get('body')
    })
    await newMessage.save();
    return {submitted: true}
}

export default addMessage