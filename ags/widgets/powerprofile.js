const powerprofile = await Service.import("powerprofiles");
const battery = await Service.import("battery");
const cpu = Variable(0, {
	poll: [
		1000,
		"bash -c \"top -bn1 | grep 'Cpu(s)' | awk '{print 100 - $8}'\"",
		(out) => {
			return parseInt(out) / 100;
		},
	],
});
const mem = Variable(0, {
	poll: [
		1000,
		"bash -c \"free | grep Mem | awk '{print ($3/$2)}'\"",
		(out) => {
			return parseFloat(out);
		},
	],
});

const temp = Variable("", {
	poll: [
		1000,
		`bash -c "sensors | grep 'Package id 0' | awk '{print $4}'"`,
		(out) => `  ${out.slice(1, out.length)}`,
	],
});

export function Powerprofile() {
	let selector = Widget.Box({
		class_name: "powerprofile",
		children: [
			Widget.Button({
				css: "border-radius: 10px 0 0 10px",
				child: Widget.Label({
					hexpand: true,
					label: "󰌪",
					class_name: "",
					setup: (self) =>
						self.hook(powerprofile, () => {
							if (powerprofile.active_profile == "power-saver") {
								self.parent.class_name = "power-saver-active";
							} else {
								self.parent.class_name = "power-saver";
							}
						}),
				}),
				onClicked: () => (powerprofile.active_profile = "power-saver"),
			}),
			Widget.Button({
				css: "border-radius: 0;",
				child: Widget.Label({
					hexpand: true,
					label: "󰚀",
					class_name: "",
					setup: (self) =>
						self.hook(powerprofile, () => {
							if (powerprofile.active_profile == "balanced") {
								self.parent.class_name = "balanced-active";
							} else {
								self.parent.class_name = "balanced";
							}
						}),
				}),
				onClicked: () => (powerprofile.active_profile = "balanced"),
			}),
			Widget.Button({
				css: "border-radius: 0 10px 10px 0",
				child: Widget.Label({
					hexpand: true,
					label: "",
					class_name: "",
					setup: (self) =>
						self.hook(powerprofile, () => {
							if (powerprofile.active_profile == "performance") {
								self.parent.class_name = "performance-active";
							} else {
								self.parent.class_name = "performance";
							}
						}),
				}),
				onClicked: () => (powerprofile.active_profile = "performance"),
			}),
		],
	});

	function wrapLevelbar(widget) {
		return Widget.Box({
			vpack: "center",
			vertical: true,
			children: [widget],
		});
	}

	return Widget.Box({
		vertical: true,
		css: "padding: 20px;",
		spacing: 5,
		children: [
			Widget.Box({
				spacing: 20,
				children: [
					Widget.Box([
						Widget.Label({
							label: cpu.bind().as((c) => ` ${parseInt(c * 100)}% `),
							name: "cpu-icon",
						}),
						wrapLevelbar(
							Widget.LevelBar({
								hexpand: true,
								name: "cpu-level",
								value: cpu.bind(),
							}),
						),
					]),
					Widget.Box([
						Widget.Label({
							label: mem.bind().as((c) => ` ${parseInt(c * 100)}% `),
							name: "mem-icon",
						}),
						wrapLevelbar(
							Widget.LevelBar({
								hexpand: true,
								name: "mem-level",
								value: mem.bind(),
							}),
						),
					]),
					Widget.Box([Widget.Label({ name: "temp", label: temp.bind() })]),
				],
			}),
			Widget.Box([
				Widget.Label({
					label: battery.bind("percent").as((p) => `  ${p}% `),
					name: "battery-icon",
				}),
				wrapLevelbar(
					Widget.LevelBar({
						hexpand: true,
						name: "battery-level",
						value: battery.bind("percent").as((p) => p / 100),
					}),
				),
			]),
			Widget.Label("Power profile"),
			selector,
		],
	});
}
