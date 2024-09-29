export function Powermenu() {
	return Widget.Box({
		homogeneous: true,
		spacing: 8,
		children: [
			Widget.Button({
				child: Widget.Label(""),
				name: "lock",
				onClicked: () => {
					Utils.exec("hyprlock");
				},
			}),
			Widget.Button({
				child: Widget.Label("󰗽"),
				name: "logout",
				onClicked: () => {
					Utils.exec("hyprctl dispatch exit");
				},
			}),
			Widget.Button({
				child: Widget.Label(""),
				name: "reboot",
				onClicked: () => {
					Utils.exec("systemctl reboot");
				},
			}),
			Widget.Button({
				child: Widget.Label("󰤆"),
				name: "poweroff",
				onClicked: () => {
					Utils.exec("systemctl poweroff");
				},
			}),
		],
	});
}
