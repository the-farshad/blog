---
title: Black Screens After DPMS: How DisplayPort HPD Storms Drained 11 GB of VRAM
date: 2026-11-10
---

## Problem

On multi-GPU NVIDIA systems running GNOME (mutter) on Wayland, the displays sometimes fail to come back after DPMS off or a screen lock. Every output stays blank while the system itself remains responsive, and only a display-manager restart brings them back.

The failure reproduced on two hosts with different distributions and GPU generations. The one thing they had in common was the ASUS ProArt PA278QV monitor.

## Diagnosis

**VRAM exhaustion.** In the failed state, gnome-shell held about 11 GB of VRAM on the primary GPU (about 0.5 GB normally), and nvidia-drm could not allocate even a single scanout buffer of about 11 MB:

```
nvidia-drm: Failed to allocate NvKmsKapiMemory for dumb object
gnome-shell: Failed to create view ... Cannot allocate memory
```

**HPD storm.** `udevadm monitor --kernel --subsystem-match=drm` showed a DRM change uevent about every 4 s from the GPUs driving the PA278QV monitors. The monitors were toggling the DisplayPort Hot Plug Detect (HPD) signal. Outputs connected to other monitors produced no events.

**Leak loop.** Each hotplug event triggers a mutter monitor reconfiguration, which rebuilds the affected outputs on the secondary GPUs without freeing the previous buffers. The outputs never come back up, so the monitors drop into standby and assert HPD again. The storm sustains itself and exhausts VRAM within minutes.

## Resolution

Fix it on the monitor side by stopping the HPD toggling. On each PA278QV, change these settings in the on-screen display (OSD) menu (names as in the [ASUS user guide](https://dlcdnets.asus.com/pub/ASUS/LCD%20Monitors/PA278QV/PA278QV_English_1130.pdf?model=PA278QV)):

| OSD path | Value |
| --- | --- |
| System Setup → DisplayPort Stream | DisplayPort 1.2 |
| System Setup → USB Charging | Off During Standby |
| Input Select | DisplayPort |

Also turn off automatic source detection if your monitor's OSD offers it; the user guide does not list that setting.

You still need to restart gnome-shell once to release the VRAM that has already leaked. On Wayland, that means logging out and back in, or restarting the display manager.

**Verification:** a forced DPMS cycle (setting `PowerSaveMode` on `org.gnome.Mutter.DisplayConfig` from 3 to 0) produced no HPD uevents. Over the following days there were no NVKMS allocation failures, and gnome-shell's VRAM use stayed at about 0.5 GB.

If your displays only recover after a display-manager restart, check per-GPU VRAM use and DRM uevents before blaming the driver.

## Sources

- [ASUS PA278QV / PA278QEV Series user guide (official PDF)](https://dlcdnets.asus.com/pub/ASUS/LCD%20Monitors/PA278QV/PA278QV_English_1130.pdf?model=PA278QV)
