---
title: "Terminatus: A Gatus Status Page in the Terminal"
date: 2026-11-10
---

[Gatus](https://github.com/TwiN/gatus) is a self-hosted health dashboard that checks your services and shows the results on a status page in the browser. [Terminatus](https://github.com/the-farshad/Terminatus) brings that status page to the terminal.

![Terminatus showing endpoint groups with uptime, response times and recent checks](https://raw.githubusercontent.com/the-farshad/Terminatus/main/screenshot.png)

It reads the Gatus API and shows every endpoint on one screen, with:

- its current state and how long it has been up or down
- its latest response time and trend
- its 24-hour uptime
- a strip of its most recent checks
- the error when it is down

Endpoints that are down are listed first in their group.

- `--watch` redraws in place; `r` refreshes now and `q` quits.
- `--concise` prints a single line, for a status bar or a script.
- It is a single file that uses only the Python standard library.

```sh
curl -fsSLo terminatus https://raw.githubusercontent.com/the-farshad/Terminatus/main/terminatus
chmod +x terminatus
./terminatus https://status.example.com --watch
```

Terminatus is released under the GPL-3.0 license. The code and full documentation are [on GitHub](https://github.com/the-farshad/Terminatus).
