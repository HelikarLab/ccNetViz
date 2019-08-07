## Required packages

The latest version of Slimer.js works with Firefox 50 - 59.

### Installing a different version of Firefox

You can find old versions of Firefox via this site;
https://ftp.mozilla.org/pub/firefox/releases/

#### Installing

```bash
wget https://ftp.mozilla.org/pub/firefox/releases/58.0/linux-x86_64/en-US/firefox-58.0.tar.bz2
```

Creating a dedicated Firefox directory

```bash
mkdir ~/slimerfox
```

Extracting files the created new directory

```bash
tar -C ~/slimerfox xvjf firefox-58.0.tar.bz2
```

Configuring .bashrc, append the end of the bash profile.

```bash
export SLIMERJSLAUNCHER=~/slimmerfox/firefox/firefox
```

Installing Xvfb (Virtual framebuffer X server for X Version 11)

```bash
sudo apt-get install xvfb
```

## Commands

You must run tests with dedicated test servers. (Test services uses predefined 8125 port.)

```bash
npm run test:server
```

```bash
npm run test
```

## Manuals

Xvfb https://www.x.org/releases/X11R7.6/doc/man/man1/Xvfb.1.xhtml
Slimerjs https://docs.slimerjs.org/current/
