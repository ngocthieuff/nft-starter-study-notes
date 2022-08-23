1. Install Chrome - Arch Linux
```console
    sudo pacman -Sy

    sudo pacman -S git

    git clone https://aur.archlinux.org/google-chrome.git

    ls

    cd google-chrome

    ls

    makepkg -s

    ls
    >>    ~/google-chrome    master ?4  ls                                                                                ✔  34s  
    eula_text.html                                     google-chrome-stable_104.0.5112.101-1_amd64.deb  PKGBUILD
    google-chrome-104.0.5112.101-1-x86_64.pkg.tar.zst  google-chrome-stable.sh                          src
    google-chrome.install  

    sudo pacman -U google-chrome-104.0.5112.101-1-x86_64.pkg.tar.zst
```