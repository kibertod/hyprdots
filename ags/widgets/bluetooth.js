import { Dropdown } from "../elements/dropdown.js";

const bluetooth = await Service.import("bluetooth");

export function Bluetooth() {
	return Widget.Box({
		class_name: "bluetooth",
		vertical: true,
		css: "min-height: 2px; min-width: 2px;",
		visible: true,
		children: [Dropdown(Widget.Label("Bluetooth 󰂯"), [], false)],
		setup: (self) => {
			self.hook(bluetooth, (self) => {
				self.children = [
					Dropdown(
						Widget.Box({
							children: [
								Widget.Label({
									label: "Bluetooth",
									hexpand: true,
									xalign: 0,
								}),
								Widget.Label("󰂯"),
							],
						}),
						bluetooth.devices
							.filter((d) => d.name !== null)
							.map((device) =>
								Widget.Button({
									on_clicked: () => {
										device.setConnection(!device.connected);
									},
									child: Widget.Box({
										spacing: 8,
										children: [
											Widget.Label({
												hexpand: true,
												label: device.name,
												justification: "left",
												xalign: 0,
											}),
											Widget.Label(`${device.paired ? "" : ""}`),
										],
									}),
									setup: (self) => {
										if (device.connected) self.class_name = "active";
									},
								}),
							),
						self.children[0].children[1].revealChild,
					),
				];
			});
		},
	});
}
