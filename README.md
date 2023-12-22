


POST http://localhost:8000/user/registration - створення користувача

{
    "username": "deniska",
    "email": "normvalerchik@gmail.com",
    "password": "nepassword"
}  - тіло запиту, потрібно передавати три параметри зі значеннями 


axios.post('http://localhost:8000/user/registration', {username, email, password})
----------------------------------------------------------------------------------------

POST http://localhost:8000/user/login - login

{
    "email": "normvalerchik@gmail.com",
    "password": "nepassword"
} - тіло запиту
----------------------------------------------------------------------

GET http://localhost:8000/user/${userId} - отримати користувача по id, потребує тільки id в адресі запиту
-----------------------------------------------------------------------------------------------------------


GET http://localhost:8000/user/info/${userId} - виводить повну інформацію про користувача з кількістью постів та підписників
---------------------------------------------------------------------------------------------------------------------------



ПОСТИ!!!!!!!!!!

POST http://localhost:8000/post/create - створення поста

потребує три параметри: userID, postText, postImage(не обов'язково)


Приклад JS функції запиту

export const createPost = (userId: number, postText: string, postImage: File) => {
      return async (dispatch: AppDispatch) => {
        try {
            const formData = new FormData()
            formData.append('userId', userId);
            formData.append('postText', postText);
            formData.append('postImage', postImage);

            const { data } = await axios.post('http://localhost:8000/post/create', formData)
        } catch (e) {
            throw e
        }
      }
}
------------------------------------------------------------------------------------------

GET http://localhost:8000/post/user/${userId} - виводить усі пости конкретного користувача
------------------------------------------------------------------------------------------

GET http://localhost:8000/post - виводить усі уснуючі пости
------------------------------------------------------------------------------------------
DELETE http://localhost:8000/post/${postId}/${userId} - видаляє пост


--------------------------------

http://localhost:8000/followers/subscribe/${userId}/${subscriberId} - ПІДписатись на людину
----------------------------------------------------------------------------------------------

http://localhost:8000/followers/unsubscribe/${userId}/${subscriberId} - ВІДписатись
