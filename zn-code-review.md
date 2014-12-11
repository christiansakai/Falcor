## JavaScript Style

JSLint Errors
https://github.com/airbnb/javascript

## MongoDB Schema Design

Embedding versus Referencing Choices
Data Types
Indexes

## Mongoose

### Validations

- not seeing any validations

### Use of Virtual Methods

- Not seeing much in the way of virtuals

### Use of hooks for notification of updates, hashing passwords

- some hooks, cool

## Node/Express

### Route structure, RESTful compliance
- Its hard for me to understand what is being done with sockets and what is being done with http
- I would encourage you to change data with http and notify with sockets
- the node API isn't restful

### No mega-controllers

- great use of promises
- it seems like you could make use of mongoose static methods to modularize some of your queries. 
- most of your node controller methods should probably move their logic into the mongoose model. Then, if you need to call them from api endpoints, you can. This will open you up to using the same logic in non http contexts. Great for batch scripts, unit testing, etc.

###Use of Middleware

- not seeing much. Might be able to break up controllers some

## Angular

https://github.com/johnpapa/angularjs-styleguide

### Use of services/factories
- Its great that you have them
- I'm not seeing quite as much consistency as I'd like

### Controller size

- I'd like to see you check out ui-router's resolve utility to unwrap promises before controllers load. It would clean some things up

### jquery only in directives

- This is looking good. I'm not seeing jQuery all over the place

### Good use of directives

- Its great that you're using directives. Seems reasonable

## Testing

### Unit Testing
### Functional Testing
### Integration Testing
### Test before deploy, testing scripts

- Not seeing much testing

## Deployment

Does your app scale past one process
Use of external services

## Workflow

- good to see 100 pull requests
- 25 issues... should be 100 if there were 100 prs, but that's ok
- don't see any commits to master, great!

