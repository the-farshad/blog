---
title: "boxglance: CPU, Memory, Disk and GPU Stats at a Glance"
date: 2026-11-10
---

[boxglance](https://github.com/the-farshad/boxglance) is a single Bash script that shows what a machine is doing on one screen: CPU, memory, disks and NVIDIA GPUs.

![boxglance showing CPU, memory and disk meters, a CPU history graph, and four GPUs with their jobs](https://raw.githubusercontent.com/the-farshad/boxglance/main/screenshot.png)

It shows:

- CPU usage (sampled over a short interval, not an instantaneous snapshot), load average and uptime
- RAM and swap usage, and disk usage for one or more mount points
- the processes using the most CPU and memory
- for each GPU, its utilization, temperature, VRAM, power draw and running jobs, through `nvidia-smi`

- `--watch` keeps it on screen with live history graphs, one for the CPU and one per GPU.
- `--concise` fits everything on one line, for a tmux status bar or a small pane.
- `--log FILE` appends a CSV row of metrics on every run.
- `--stats FILE` reports the minimum, maximum and average of each logged column, which is handy for looking back at a training run.

It needs only Bash 4.2 or newer and the usual core utilities; the GPU section is skipped when `nvidia-smi` is not installed.

```sh
curl -fsSLo boxglance https://raw.githubusercontent.com/the-farshad/boxglance/main/boxglance
chmod +x boxglance
./boxglance --watch
```

boxglance is released under the GPL-3.0 license. The code is [on GitHub](https://github.com/the-farshad/boxglance).
