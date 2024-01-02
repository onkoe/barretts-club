+++
title = "How to Expand the Filesystem on a Milk-V Duo"
description = "What do you do when you need more space? Well, you use fdisk of course!"
date = 2023-11-03
updated = 2023-11-05
[taxonomies]
tags = ["linux", "risc-v", "milk-v", "duo", "guide", "embedded"]
+++


The Milk-V Duo is a great board, but once you install your OS, you may find you need more space!

```console
[root@milkv-duo]/bin# fdisk -l
Disk /dev/mmcblk0: 119 GB, 128177930240 bytes, 250347520 sectors
3911680 cylinders, 4 heads, 16 sectors/track
Units: sectors of 1 * 512 = 512 bytes

Device       Boot StartCHS    EndCHS        StartLBA     EndLBA    Sectors  Size Id Type
/dev/mmcblk0p1 *  0,0,2       16,81,2              1     262144     262144  128M  c Win95 FAT32 (LBA)
/dev/mmcblk0p2    16,81,3     114,57,8        262145    1835008    1572864  768M 83 Linux
/dev/mmcblk0p3    114,57,9    146,219,10     1835009    2359296     524288  256M  0 Empty
[root@milkv-duo]/bin# df -h
Filesystem                Size      Used Available Use% Mounted on
/dev/root               745.4M    154.0M    549.0M  22% /
devtmpfs                 14.2M         0     14.2M   0% /dev
tmpfs                    14.3M         0     14.3M   0% /dev/shm
tmpfs                    14.3M     52.0K     14.2M   0% /tmp
tmpfs                    14.3M     28.0K     14.2M   0% /run
[root@milkv-duo]/bin# 
```

That's unfortunate - I bought [a fancy 128 GiB microSD](https://amzn.to/40qdGYY) just for this board! That's an affiliate link, by the way.

Luckily, we can remedy this! Start by sticking your microSD card back into your computer. Ensure you have the `fdisk` command alongside `e2fsck` and `resize2fs`. In general, you'll need a Linux machine (or a complex WSL/Docker setup) for these packages.

You can install these on Fedora with `sudo dnf install fdisk e2fsprogs -y`, or on Debian/Ubuntu/Pop_OS! with `sudo apt update && sudo apt install fdisk e2fsprogs`.

Also, **make a backup of any important data!**

With these on the computer and our data all safe, let's start by looking at our disk as-is:

```console
barrett@farts ~> lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 931.5G  0 disk 
(snip! a lot of extra junk was here)
sdf      8:80   1     0B  0 disk 
sdg      8:96   1 119.4G  0 disk <---- MY SD CARD
├─sdg1   8:97   1   128M  0 part 
├─sdg2   8:98   1   768M  0 part 
└─sdg3   8:99   1   256M  0 part 

barrett@farts ~> sudo fdisk -l /dev/sdg
[sudo] password for barrett: 
Disk /dev/sdg: 119.38 GiB, 128177930240 bytes, 250347520 sectors
Disk model: STORAGE DEVICE  
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device     Boot   Start     End Sectors  Size Id Type
/dev/sdg1  *          1  262144  262144  128M  c W95 FAT32 (LBA)
/dev/sdg2        262145 1835008 1572864  768M 83 Linux
/dev/sdg3       1835009 2359296  524288  256M  0 Empty
barrett@farts ~>
```

As you can see, the board wastes a lot of space here! There's also the "empty" partition that folks usually use for swap. We'll remove it, but feel free to re-add it afterward!

Remember that our card is `/dev/sdg` here. Your card will probably be called something different, likely some `/dev/sdX`, so please keep that in mind.

## Expanding the Filesystem

Let's get to work! We'll unmount the microSD card, then open up `fdisk`. We'll ask it to tell us more about the card first, write those values down, and then make some changes!

```console
barrett@farts ~> sudo fdisk /dev/sdg

Welcome to fdisk (util-linux 2.38.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p
Disk /dev/sdg: 119.38 GiB, 128177930240 bytes, 250347520 sectors
Disk model: STORAGE DEVICE  
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device     Boot   Start     End Sectors  Size Id Type
/dev/sdg1  *          1  262144  262144  128M  c W95 FAT32 (LBA)
/dev/sdg2        262145 1835008 1572864  768M 83 Linux
/dev/sdg3       1835009 2359296  524288  256M  0 Empty
```

Okay, make sure to write down those values! You can also snap a photo of them or open them in [Text Editor](https://apps.gnome.org/TextEditor/) (my beloved)! 🤤️

{{ cache_image(alt="a photo of me pointing at GNOME Text Editor, complete with the f disk output inside!", link="/images/milkv-duo-expand-fs/gte-saved.webp", filetype="webp") }}

Alright, now we have to do the hard part! We'll (temporarily) delete the Linux partition and make it much longer.

```console
Command (m for help): d
Partition number (1-3, default 3): 2

Partition 2 has been deleted.

Command (m for help): d
Partition number (1,3, default 3): 3

Partition 3 has been deleted.

Command (m for help):
```

If you didn't delete `sdX3`, when you try to resize, you'll find that you're limited to around `1835008` sectors on the Linux partition - which you started with!

Now, we'll make a new partition that is 'pretending' to be the old one. When you do this, `fdisk` will ask for a few options. You want a `p` (for "primary") Partition Type, `2` for the Partition Number, and the default (first available) sector for the First Sector.

{% warning() %}
The Last Sector is a little cloudy, as you may want to re-add the third ("empty") partition back for swap memory.

In that case, subtract the size of the swap partition (which should usually be `end - start = 2359296 - 1835009 = 524287` sectors) from the number of sectors you would allocate (the maximum, so for me, `250347520`..!

You'll have extra space at the back to add swap later, but you don't have to deal with the 768 MiB limit on your Linux partition.
{% end %}

That said, I won't be using swap, so I'll make the Linux partition take up the whole space.

```console
Command (m for help): n
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (2-4, default 2): 2
First sector (262145-250347519, default 264192): 262145
Last sector, +/-sectors or +/-size{K,M,G,T,P} (262145-250347519, default 250347519): 

Created a new partition 2 of type 'Linux' and of size 119.2 GiB.
Partition #2 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o:
```

You can see it asked us if we want to remove the signature. No, we don't!

```console
Do you want to remove the signature? [Y]es/[N]o: n

Command (m for help):
```

To be safe, let's also change the partition type to `83` (Linux). The card should have kept it, though!

```console
Command (m for help): t
Partition number (1,2, default 2): 2
Hex code or alias (type L to list all): 83

Changed type of partition 'Linux' to 'Linux'.
```

Good, nothing changed!

Now, you can save your changes to disk with `w` (for "write")!

```console
Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

You should be back at your command line! Now, we can dust off the other tools! Let's start with `e2fsck`. This tool runs a check on a given filesystem. It should be a good start to see if everything went well!

```console
barrett@farts ~> sudo e2fsck -f /dev/sdg2
e2fsck 1.46.5 (30-Dec-2021)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
rootfs: 4730/49152 files (0.6% non-contiguous), 180791/786432 blocks
barrett@farts ~>
```

If you got an error, you likely made a mistake in `fdisk`. Please reflash the card and try again!

Also, let's double-check with `fdisk` to make sure everything looks good:

```console
barrett@farts ~> sudo fdisk -l /dev/sdg
Disk /dev/sdg: 119.38 GiB, 128177930240 bytes, 250347520 sectors
Disk model: STORAGE DEVICE  
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device     Boot  Start       End   Sectors   Size Id Type
/dev/sdg1  *         1    262144    262144   128M  c W95 FAT32 (LBA)
/dev/sdg2       262145 250347519 250085375 119.2G 83 Linux
barrett@farts ~>
```

Looks good to me! Now, let's do the full resize:

```console
barrett@farts ~> sudo resize2fs /dev/sdg2
resize2fs 1.46.5 (30-Dec-2021)
Resizing the filesystem on /dev/sdg2 to 125042684 (1k) blocks.
The filesystem on /dev/sdg2 is now 125042684 (1k) blocks long.

barrett@farts ~>
```

This action should take a moment. In fact, for my USB 2.0 SD card reader with a microSD to SD converter, it took FOREVER..!

{{ cache_image(alt="a screenshot of GNOME Mission Control watching my slow-ass SD card reader from the mid 2000s!", link="/images/milkv-duo-expand-fs/sd-struggles.webp", filetype="webp") }}

After it's done, though, we've completed the project!

## Taking a Peek

You can now mount the disk and check your work:

```console
sudo mkdir /mnt/duo
sudo mount -t /dev/sdg2 /mnt/duo
```

Of course, you can also just open it in Nautilius (or some other file manager)!

{{ cache_image(alt="GNOME Files, also known as Nautilus, displaying mount information about slash dev slash s d g two. It says we have around 120 gigabytes free!", link="/images/milkv-duo-expand-fs/all-done.webp", filetype="webp") }}

{% conclusion() %}

Great job - you've expanded your disk the old-fashioned way!

If you have any questions, suggestions, or concerns, please let me know by <a href="mailto:contact@barretts.club">email</a>! You can also [make an issue](https://github.com/onkoe/barretts-club/issues/new?title=problem:%20How%20to%20Expand%20the%20Filesystem%20on%20a%20Milk-V%20Duo&body=I%20found%20a%20problem%20in%20How%20to%20Expand%20the%20Filesystem%20on%20a%20Milk-V%20Duo!%20Let%20me%20explain...) on GitHub.

Thank you! :)

{% end %}
