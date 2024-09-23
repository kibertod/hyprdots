if status is-interactive
    export QT_QPA_PLATFORMTHEME=gtk3
    export PATH="$PATH:/home/kibertod/.dotnet/tools"
    export TERM="xterm-256color"
    clear;
    set -g fish_greeting
end

function nvim
    kitty @ set-spacing padding=0 && /usr/bin/nvim $argv && kitty @ set-spacing padding=20
end
