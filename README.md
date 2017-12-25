# admin_edit

################################################ Server #########################################
1. Check if mysql is installed
2. Create 'admin_edit' database
3. Check db connection at be/knexfiles.js
4. Go to 'be' folder and run 'npm i'
5. Run migration: 'knex migrate:latest'
6. Start project by 'npm run nodemon'

################################################ Client #########################################
1. Go to 'fe' folder
2. Run 'npm i'
3. Run 'npm run build'
4. Run 'npm run nodemon'
5. In another tab run "npm run webpack-devserver"
6. Go to the 'http://localhost:3005/' at the browser
7. To login use:
  login: admin
  password: admin
  
Attention: server rendering doesn't serve styles for the UI - that's why you will see UI at the first mount without styles.  
