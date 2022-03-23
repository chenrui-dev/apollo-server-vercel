# apollo-server-vercel <!-- omit in toc -->

[![deployment](https://img.shields.io/github/deployments/chenrui333/apollo-server-vercel/Production?label=vercel&style=flat-square)](https://github.com/chenrui333/apollo-server-vercel/deployments/activity_log?environment=Production)

Setup an Apollo GraphQL Server On Vercel

- [curl test](#curl-test)
  - [local test](#local-test)
- [rate limit test](#rate-limit-test)
- [credit](#credit)

## curl test

```
curl -s -X POST 'https://apollo-server-vercel-nine.vercel.app/graphql' \
  --header 'Content-Type: application/json' \
  -d '{"query":"{\n    hello\n}","variables":{}}' -v
...

* We are completely uploaded and fine
* Connection state changed (MAX_CONCURRENT_STREAMS == 128)!
< HTTP/2 200
< content-type: application/json; charset=utf-8
< date: Wed, 23 Mar 2022 18:54:57 GMT
< x-powered-by: Express
< access-control-allow-origin: *
< etag: W/"47-hvQv93zOyyIYmrUiU5wUNxTfVPY"
< content-length: 71
< x-vercel-cache: MISS
< server: Vercel
< x-vercel-id: iad1::iad1::c8kbn-1648061697187-993331bc0f14
< strict-transport-security: max-age=63072000; includeSubDomains; preload
< cache-control: public, max-age=0, must-revalidate
```

### local test

```
$ curl -s -X POST 'http://localhost:9001/graphql'   --header 'Content-Type: application/json'   -d '{"query":"{\n    hello\n}","variables":{}}' -v
...
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 71
< ETag: W/"47-hvQv93zOyyIYmrUiU5wUNxTfVPY"
< Date: Wed, 23 Mar 2022 18:58:14 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
```

## rate limit test

```
$ curl -s -X POST 'http://localhost:9001/graphql'   --header 'Content-Type: application/json'   -d '{"query":"{\n    hello\n}","variables":{}}' -v
...
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 846
< ETag: W/"34e-zNqtLJPRwRT52bI2MkoWmsTpvA8"
< Date: Wed, 23 Mar 2022 19:31:27 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
{"errors":[{"message":"Too many requests, please try again in 13 seconds.","locations":[{"line":2,"column":5}],"path":["hello"],"extensions":{"code":"INTERNAL_SERVER_ERROR","exception":{"message":"Too many requests, please try again in 13 seconds.","stacktrace":["GraphQLError: Too many requests, please try again in 13 seconds.","    at defaultOnLimit (/Users/rui/open-source/apollo-server-vercel/node_modules/graphql-rate-limit-directive/dist/index.js:70:11)","    at /Users/rui/open-source/apollo-server-vercel/node_modules/graphql-rate-limit-directive/dist/index.js:128:28","    at Generator.throw (<anonymous>)","    at rejected (/Users/rui/open-source/apollo-server-vercel/node_modules/graphql-rate-limit-directive/dist/index.js:6:65)","    at processTicksAndRejections (node:internal/process/task_queues:96:5)"]}}}],"data":{"hello":null}}
```

## credit

https://medium.com/@sppericat/how-to-setup-an-apollo-graphql-server-on-vercel-cc3f2dd72b3e
