# Commands

## login command

```bash
 curl -X POST http://localhost:3333/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
```

## list of problems

```bash
curl http://localhost:3333/api/problems -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyMTEwMzc3OCwiZXhwIjoxNjIxMTkwMTc4fQ.KK4NxxQ6vSzg8ROjzXsEiLft77QO7eZ5KAbgKLvsKeg"
```
