
# Express + Mongo + Redis + Typescript Auth
Redis is an in-memory caching system, that is very fast to retrieve. Used to store things like profile info, message counts, etc.

- Create a basic authentication and authorization server with node + express + mongodb atlas + redis + typescript and run using ```npx tsc commands......```.
- Run a redis/redis-stack container in docker. Port 6379 is the actual redis container port, and port 8001 is the GUI to see the current state of the redis cache.
- Create a redis client and export it wherever you want to use it, usually in the controller file.
- Use redis client functions like ```set```, ```get```, etc. to create and access cache from redis server.

