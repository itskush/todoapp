# To do App
````
Follow steps below to run application
````
## Project setup
```
npm install from root folder
```

## Create Env file in root folder
```
Set up env variables for DB (MySQL) 
Example
DB_HOST='127.0.0.1'
DB_PORT='3306'
DB_NAME='tasks'
DB_USER=root
DB_PASS=

```
### Compile front build
```
cd front
npm install
npm run build
This will store it in a dist folder that the server will access and display
```

### Starts server on localhost:3000
```
npm run start
```



### To run some tests on the api
```
From root folder
Do npm test to test with jest
```
