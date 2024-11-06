## Serverless REST Assignment - Distributed Systems.
Name: Donal Wall

Demo: https://youtu.be/kq5hQg7ycKs

### Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

### Context.
For this assignment, the context for my web API is movie data, designed to store and manage detailed information about movies. It contains information such as:

- Overview - A Movie Summary, a long enough string of text that could function with the translate function.
- Title - Title of the Movie.
- ID - Movie Unique Identidier
- Genere ID - A list of genre IDs associated with the movie.

And many more. I feel this data was enough to demostrate my knowledge, the various endpoints and translate feature integration.

### App API endpoints.
 
- **GET /movies** - Retrieve all movies.
- **POST /movies** - Add a new movie.
- **GET /movies/{movieId}** - Get details of a specific movie by its ID.
- **PUT /movies/{movieId}** - Update an existing movie by its ID (Protetced Route).
- **DELETE /movies/{movieId}** - Delete a specific book by its ID.
- **GET movies/{movieId}/translate?language=value** - Translate the overview of a movie based on its ID and target language.

### Auth API endpoints.

- **POST /auth/signup** - Sign up a new user.
- **POST /auth/confirm-signup** - Confirm a new user.
- **POST /auth/signin** - Sign in a user.
- **GET /auth/signout** - Sign out a user.

### API Gateway

![image](https://github.com/user-attachments/assets/58966816-d727-4399-b804-29d47fc4ff12)


### Authentication

![image](https://github.com/user-attachments/assets/86cdc84b-a627-4475-9fd2-27e920cfcb84)


### Update constraint.
The UpdateMovieFn function retrieves the movieId from the request, parses the body for updated data, and constructs an update command.
It updates the title and genre_ids attributes of the movie in DynamoDB, regardless of the user making the request.

For this update constraint, any authenticated user can update a movie item, however it is protected routes and a user have to be logged in to update a movie.

### Translation persistence/ Independent Learning.

The lambda function (translate.ts) uses AWS Translate to translate the movie overview text based on language codes provided by the user. The method fetches movie content from DynamoDB and translates the overview when the request is made.

Here were the relevent websites/video walkthroughs I used as referneces to learn more about this and integrate it:
- https://docs.aws.amazon.com/cdk/v2/guide/permissions.html
- https://completecoding.io/typescript-translation-api/
