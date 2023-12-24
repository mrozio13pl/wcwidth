# wcwidth [![npm](https://img.shields.io/npm/v/@mrozio/wcwidth?color=4CAF50&label=)](https://npm.im/@mrozio/wcwidth)

Dead simple, tiny (`~2.3 kB`) port of [wcwidth](https://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c) implemented in C by Markus Kuhn.

```bash
npm i @mrozio/wcwidth
```

```ts
import { wcwidth, wcswidth } from '@mrozio/wcwidth';

'嘿'.length; // <= 1
wcwidth('嘿'.charCodeAt()); // <= 2

'我讨厌 JavaScript'.length; // <= 14
wcswidth('我讨厌 JavaScript'); // <= 17
```

## License

MIT 💖