#!/usr/bin/env fish
#

set  pid (pgrep -f "amberol")
set  wsp (hyprctl activeworkspace | grep ID|awk '{print $3}' | grep -oE '^\s*[0-9]+')
set  spec (hyprctl workspaces | grep special)

if test -n "$spec"
                hyprctl dispatch movetoworkspace $wsp,pid:$pid
        else
                hyprctl dispatch movetoworkspacesilent special,pid:$pid
end
