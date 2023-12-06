# mongoose_assign_L2


Assignment Two


To run the app to local device you have to follow the following steps:

first copy the git repo and then 

selcet a folder and in the folder open the terminal and write 
git clone github link

then 

go to the folder and run 
npm i
then
add .env file 
and write 

NODE_ENVIRONMENT=development
PORT=5000 or what u want
DATABASE_URL=db_link

then

npm run start:dev

Yeah you have successfully run the local server


Live Link:

https://first-app-with-mongose-typescript.vercel.app

Routes:

FOR CREATE USER
POST
https://first-app-with-mongose-typescript.vercel.app/api/users

FOR GETTING ALL THE USERS
GET
https://first-app-with-mongose-typescript.vercel.app/api/users

FOR GETTING SINGLE USER
GET
https://first-app-with-mongose-typescript.vercel.app/api/users/{1}

FOR GETTING SPECIFIC USER ALL ORDERS
GET
https://first-app-with-mongose-typescript.vercel.app/api/users/{1}/orders

FOR GETTING TOTAL PRICE OF ORDERS FOR A SPECIFIC USER
GET
https://first-app-with-mongose-typescript.vercel.app/api/users/{1}/orders/total-price


TO ADD ORDERS TO A SPECIFIC USER
PUT
https://first-app-with-mongose-typescript.vercel.app/api/users/{1}/orders

TO UPDATE USER DATA
PUT
https://first-app-with-mongose-typescript.vercel.app/api/users/{1}

TO DELTE SPECIFIC USER
DELETE
https://first-app-with-mongose-typescript.vercel.app/api/users/{1}
