Let's Get Started.

1. First off we need to create a project folder for our code. 
   We can do this by opening our terminal and inputting `mkdir our-project-name`

1. Now we create a new folder within our project's folder naming it `public` 

1. Next we download the boilerplate code for chatapp's styling and html structure and to our
   `public` folder

1. Our next is to open our project folder within our chosen IDE (I'm using VSCode)

1. Opening the project folder within our terminal I now enter the `yarn init` command this is
   to create our package.json file which will contain information about our projects packages and dependencies.
   It also contains metadata for the project such as version number, author, and description. 

1. Add the following to your package.json: 

```
"scripts": {
    "start": "node server",
    "dev": "nodemon server"
  },
```

1. Now that we've created our package.json file we install our projects dependencies such as: 

- Express

- Socket.io

- Moment

- Nodemon

1. We can install Express, Socket.io and Moment like this:

`yarn add express socket.io moment`

1. We now install Nodemon as a dev-dependency

`yarn add --D Nodemon`

1. Next step is to make an Express server

1. Create a file named server.js in the root of your project nd input the following code.

// Insert Server Code.

1. Now navigate to the `chat.html` file within the public folder

1. Append the following script tag above the previous script tag

  <!-- Add this script tag when server is closed! -->
  <script src="/socket.io/socket.io.js"></script>

1. Next within the JS folder you will see a `main.js` file, this is where we will implement our code for the application

1.  Copy the following code into your main.js

insert code here 

1. Now we create a new folder named utils 

1. In this new folder we will also create a new file named `messages.js`

1. In this we will be using the moment pack we installed earlier to format time for us 

// Inserts code here

1. Navigate back to our `server.js`  and implement the following code

const formatMessage = require('./utils/messages')

const botName = 'TevCord Bot'

  socket.emit(`message`, formatMessage(botName,`welcome to tevcord!`))

1. Once that's done we can no get rid of the lorem ipsum messages. in our `chat.html`

1. We now need to implement this query string parser `https://cdnjs.cloudflare.com/ajax/libs/qs/6.10.1/qs.min.js`