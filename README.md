Serverless REST Assignment - Distributed Systems.
Name: Donal Wall

Demo: ... link to your YouTube video demonstration ......

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

Context.
State the context you chose for your web API and detail the attributes stored in the main database table.

App API endpoints.
[ Provide a bullet-point list of the app's endpoints (excluding the Auth API) you have successfully implemented. ]
e.g.
 
- **GET /movies** - Retrieve all movies.
- **POST /movies** - Add a new movie.
- **GET /movies/{movieId}** - Get details of a specific movie by its ID.
- **PUT /movies/{movieId}** - Update an existing movie by its ID.
- **DELETE /movies/{movieId}** - Delete a specific book by its ID.
- **DELETE /movies** - Delete all books.
- **GET movies/{movieId}/translate?language=value** - Translate the overview of a movie based on its ID and target language.

Update constraint (if relevant).
[Briefly explain your design for the solution to the PUT/Update constraint 
only the user who added an item to the main table could update it.]

Translation persistence (if relevant).
[Briefly explain your design for the solution to avoid repeat requests to Amazon Translate - persist translations so that Amazon Translate can be bypassed for repeat translation requests.]

Extra (If relevant).
[ State whether you have created a multi-stack solution for this assignment or used lambda layers to speed up update deployments. Also, mention any aspect of the CDK framework __that was not covered in the lectures that you used in this assignment. ]
