#!/usr/bin/env bash

name="laying-down"
autostart_dir="$HOME/.config/autostart"
autostart_file="$autostart_dir/$name.desktop"
destination="/opt/$name"

git clone --depth=1 https://github.com/fiquell/"$name"
cd "$name" && bun i && cd .. && sudo mv "$name" "$destination"

mkdir -p "$autostart_dir"

cat >"$autostart_file" <<EOL
[Desktop Entry]
Type=Application
Name=$name
Exec=$name
StartupNotify=false
Terminal=false
EOL

cat >"$name" <<EOL
#!/usr/bin/env bash

cd $destination && bun start
EOL

chmod +x "$name" && sudo cp "$name" /usr/local/bin && rm "$name"

echo -e "\nDONE! ✨ 🍪 ✨"
