## Serverless REST Assignment - Distributed Systems.
Name: Donal Wall

Demo: ... link to your YouTube video demonstration ......

### Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

### Context.
State the context you chose for your web API and detail the attributes stored in the main database table.

### App API endpoints.
 
- **GET /movies** - Retrieve all movies.
- **POST /movies** - Add a new movie.
- **GET /movies/{movieId}** - Get details of a specific movie by its ID.
- **PUT /movies/{movieId}** - Update an existing movie by its ID.
- **DELETE /movies/{movieId}** - Delete a specific book by its ID.
- **GET movies/{movieId}/translate?language=value** - Translate the overview of a movie based on its ID and target language.

### Auth API endpoints.

- **POST /auth/signup** - Sign up a new user.
- **POST /auth/confirm-signup** - Confirm a new user.
- **POST /auth/signin** - Sign in a user.
- **GET /auth/signout** - Sign out a user.

### Update constraint (if relevant).
[Briefly explain your design for the solution to the PUT/Update constraint 
only the user who added an item to the main table could update it.]

### Translation persistence (if relevant).

The lambda function (translate.ts) uses AWS Translate to translate the movie overview text based on language codes provided by the user. The method fetches movie content from DynamoDB and translates the overview when the request is made.

Here were the relevent websites/video walkthroughs I used as referneces to complete this:
- https://docs.aws.amazon.com/cdk/v2/guide/permissions.html
- https://completecoding.io/typescript-translation-api/

### Extra (If relevant).
[ State whether you have created a multi-stack solution for this assignment or used lambda layers to speed up update deployments. Also, mention any aspect of the CDK framework __that was not covered in the lectures that you used in this assignment. ]
