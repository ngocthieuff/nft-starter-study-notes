Dart: https://archlinux.org/packages/community/x86_64/dart/
```console
sudo pacman -S dart
```

Flutter: https://aur.archlinux.org/packages/flutter

```console
git clone https://aur.archlinux.org/flutter.git

ls

cd flutter

ls 
// flutter.csh  flutter.install  flutter.sh  PKGBUILD

makepkg -si

```

result... ``Flutter was installed on /opt/flutter
``

In case you encounter problems using Flutter as regular user, add your user into the group flutterusers:
```console
gpasswd -a ${USER} flutterusers
```

list existing users:
```console
sudo passwd -Sa
```

add new user to flutterusers:
```console 
sudo gpasswd -a ngocthieu flutterusers
```

Re-login your terminal in to the group flutterusers:
```console
newgrp flutterusers
```

now, you can check flutter status:
```console
flutter doctor
```