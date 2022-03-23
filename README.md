# apollo-server-vercel <!-- omit in toc -->

Setup an Apollo GraphQL Server On Vercel

- [curl test](#curl-test)
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

## credit

https://medium.com/@sppericat/how-to-setup-an-apollo-graphql-server-on-vercel-cc3f2dd72b3e
