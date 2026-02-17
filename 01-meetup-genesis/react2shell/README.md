# React2shell talk

Slides were created with [reveal.js](https://revealjs.com/).
Serve with any local http server, for example `python3 -m http.server 8000` to view the slides in their intended format (or just use [the pdf](./react2shell.pdf) in a pinch).

The slides iframe a vibe coded flight protocol demo app at http://localhost:3000/. This app can be run using the included [Dockerfile](flight-poc/Dockerfile) using the following command:

```sh
docker build --no-cache -t flight-poc . && \
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.next \
  -e WATCHPACK_POLLING=true \
  flight-poc
```

[This project](https://github.com/l4rm4nd/CVE-2025-55182) can be used to experiment with different exploits .

## Additional Reading and references

- https://react2shell.com/
- https://github.com/lachlan2k/React2Shell-CVE-2025-55182-original-poc
- https://gist.github.com/maple3142/48bc9393f45e068cf8c90ab865c0f5f3
- https://medium.com/profusion-engineering/react2shell-critical-vulnerability-in-react-server-explained-with-technical-details-of-code-b75a84e76a1c
- https://x.com/rauchg/status/1997362942929440937
