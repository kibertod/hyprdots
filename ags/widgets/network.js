import { Dropdown } from "../elements/dropdown.js";

const { wifi } = await Service.import("network");

export function Vpn() {
	return Widget.Button({
		name: "vpn",
		vexpand: false,
		child: Widget.Box({
			children: [Widget.Label("VPN")],
		}),
		onClicked: (self) => {
			if (self.class_name === "active") {
				Utils.execAsync("nmcli connection down wg_private");
				Utils.execAsync(`nmcli connection up ${wifi.ssid}`);
				self.class_name = "";
			} else {
				Utils.execAsync("nmcli connection up wg_private");
				Utils.execAsync(`nmcli connection up ${wifi.ssid}`);
				self.class_name = "active";
			}
		},
		setup: (self) => {
			let active =
				Utils.exec(
					`bash -c 'nmcli -t -f name connection show --active | grep -q "wg_private" && echo true || echo false'`,
				) === "true";
			self.class_name = active ? "active" : "";
		},
	});
}

export function Network() {
	let widget = Widget.Box({
		class_name: "network",
		vertical: true,
		css: "min-height: 2px; min-width: 2px;",
		visible: true,
		children: [Dropdown(Widget.Label("Wifi"), [], false)],
		setup: (self) => {
			self.hook(wifi, () => {
				self.children = [
					Dropdown(
						Widget.Box({
							spacing: 8,
							children: [
								Widget.Label({
									label: `${wifi.ssid || "Wifi"}`,
									hexpand: true,
									xalign: 0,
								}),
								Widget.Label(""),
							],
						}),
						wifi.access_points
							.sort((a, b) => b.strength - a.strength)
							.slice(0, 10)
							.filter((p) => p.ssid != wifi.ssid)
							.map((ap) =>
								Widget.Button({
									on_clicked: () => {
										Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`);
									},
									child: Widget.Box({
										spacing: 8,
										children: [
											Widget.Label({
												hexpand: true,
												xalign: 0,
												label: ap.ssid || "",
												justification: "left",
											}),
											Widget.Label({
												label: `${ap.strength > 80 ? "󰤨" : ap.strength > 65 ? "󰤥" : ap.strength > 50 ? "󰤢" : ap.strength > 35 ? "󰤠" : "󰤫"}`,
												justification: "right",
											}),
										],
									}),
								}),
							),
						self.children[0].children[1].revealChild,
					),
				];
			});
		},
	});

	return widget;
}
