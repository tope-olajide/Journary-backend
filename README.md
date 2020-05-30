# Journary
Journary is an online journal where users can pen down their thoughts and feelings.
[The front-end repo is here](https://github.com/tope-olajide/journary-frontend)
## Hosted Application

**Front-end** https://journary.netlify.app/
**Back-end** https://journary.cleverapps.io/


1. Install [`node`](https://nodejs.org/en/download/), version 12 or greater

2. Clone this repo and cd into it

   ```
   git clone https://github.com/tope-olajide/Journary-backend.git
   cd Journary-backend
   ```

3. Install all dependencies

   ```
   npm install
   ```

4. Start the app by running:

   ```
   npm run dev
   ```
## API Routes

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>
<tr><td>POST</td> <td>api/user/signin</td> <td>Sign in a user</td></tr>
<tr><td>POST</td> <td>api/user/signup</td> <td>Create a new user</td></tr>
<tr><td>GET</td> <td>api/user/cancel-reminder/:email</td> <td>Cancel Reminder</td></tr>
<tr><td>POST</td> <td>api/user/set-all-reminders</td> <td>Restart all reminders(incase the server crash)</td></tr>
<tr><td>PUT</td> <td>api/user/update-profile</td> <td>Update user's profile</td></tr>
<tr><td>POST</td> <td>api/user/gallery</td> <td>Save Image Url</td></tr>
<tr><td>GET</td> <td>api/user/gallery</td> <td>Fetch Image Galleries</td></tr>
<tr><td>DELETE</td> <td>api/user/gallery/:imageId</td> <td>Delete image</td></tr>
<tr><td>GET</td> <td>api/user/</td> <td>Fetch user's profile</td></tr>
<tr><td>GET</td> <td>api/user/get-reminder</td> <td>Fetch reminder</td></tr>
<tr><td>POST</td> <td>api/user/set-reminder</td> <td>Save Reminder</td></tr>
<tr><td>GET</td> <td>api/user/fetch-all-reminders</td> <td>Fetch all reminders</td></tr>
<tr><td>GET</td> <td>api/user/unsubscribe/:email</td> <td>Cancel Reminder</td></tr>
<tr><td>GET</td> <td>api/entry/search</td> <td>Search for diary</td></tr>
<tr><td>POST</td> <td>api/entry/</td> <td>Add new Entry</td></tr>
<tr><td>GET</td> <td>api/entry/</td> <td>Fetch all public entries</td></tr>
<tr><td>GET</td> <td>api/entry/private</td> <td>Fetch all user's Private entries</td></tr>
<tr><td>GET</td> <td>api/entry/public</td> <td>Fetch all user's Public entries</td></tr>
<tr><td>PUT</td> <td>api/entry/:entryId</td> <td>Modify modify entry</td></tr>
<tr><td>DELETE</td> <td>api/entry/:entryId</td> <td>Delete user entry</td></tr>
<tr><td>GET</td> <td>api/entry/:entryId</td> <td>Fetch entries details</td></tr>
<tr><td>GET</td> <td>api/entry/get-entry/:entryId</td> <td>Fetch entry without updating the view count</td></tr>

</table>

## Built With

* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Postgres](https://www.postgresql.org/) - A powerful, open source object-relational database system.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributing

If you are interested in contributing to development of this project, follow the instructions below to contribute.

- Fork the repository

- Make your change

- Commit your change to your forked repository

- Provide a detailed commit description

- Raise a pull request against the master branch

#### Can I clone this application for personal use?

Yes!. This application is licensed under MIT, and it's open for everybody

## Author

- **Temitope David Olajide** - Fullstack Developer.
