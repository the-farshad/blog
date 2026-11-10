---
title: "slurmtop: A Terminal Dashboard for Slurm Jobs"
date: 2026-11-06
---

[slurmtop](https://github.com/the-farshad/slurmtop) is a single Bash script that shows your Slurm jobs, their priority, how busy the GPU partitions are, and your storage, all on one screen that refreshes live.

![slurmtop showing a user's jobs, their priority, GPU partition usage and storage](https://raw.githubusercontent.com/the-farshad/slurmtop/main/screenshot.png)

It shows:

- your jobs, including job arrays: state, run time, time limit, CPUs, memory, GPUs, priority, expected start, and the nodes or the reason a job is waiting
- the priority breakdown of your pending jobs, and your accounts' fair-share
- for each GPU partition: GPUs in use, down and free; idle nodes; and the number of waiting jobs (other users' jobs appear only as counts)
- storage use for the paths you choose

It runs on a cluster login node, or on your own computer over ssh, reusing a single connection. It is also light on the scheduler: it asks Slurm at most once every 15 seconds and checks storage every 10 minutes, whatever the refresh interval.

```sh
curl -fsSLo slurmtop https://raw.githubusercontent.com/the-farshad/slurmtop/main/slurmtop
chmod +x slurmtop
SLURMTOP_HOST=login.mycluster.example ./slurmtop
```

slurmtop is released under the GPL-3.0 license. The code is [on GitHub](https://github.com/the-farshad/slurmtop).
