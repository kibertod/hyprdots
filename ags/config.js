import { Network, Vpn } from "./widgets/network.js";
import { Bluetooth } from "./widgets/bluetooth.js";
import { Powerprofile } from "./widgets/powerprofile.js";
import { Powermenu } from "./widgets/powermenu.js";
import { Clock } from "./widgets/clock.js";
import { Audio } from "./widgets/audio.js";
import { Mpd } from "./widgets/mpd.js";

const sidebar = Widget.Window({
	visible: false,
	monitor: 1,
	name: "sidebar",
	anchor: ["top", "right"],
	margins: [20, 20, 20, 20],
	child: Widget.Box({
		css: "padding: 20px",
		spacing: 20,
		children: [
			Widget.Box({
				spacing: 20,
				children: [
					Widget.Box({ vertical: true, children: [Powermenu()] }),
					Bluetooth(),
				],
			}),
			Widget.Box({
				spacing: 20,
				children: [
					Network(),
					Widget.Box({ vertical: true, children: [Vpn()] }),
				],
			}),
			Widget.Separator(),
			Audio(),
			Widget.Separator(),
			Mpd(),
			Widget.Box({ vexpand: true }),
			Widget.Separator(),
			Clock(),
			Widget.Separator(),
			Powerprofile(),
		],
		vertical: true,
	}),
});

const calendar = Widget.Window({
	visible: false,
	monitor: 1,
	name: "calendar",
	anchor: ["top"],
	margins: [20, 20, 20, 20],
	child: Widget.Box({
		css: "padding: 20px",
		spacing: 20,
		vertical: true,
		children: [Widget.Calendar(), Widget.Separator(), Clock()],
	}),
});

const scss = `${App.configDir}/style.scss`;
const css = `/tmp/my-style.css`;
Utils.exec(`sassc ${scss} ${css}`);

Utils.monitorFile(
	// directory that contains the scss files
	`${App.configDir}/style`,

	// reload function
	function () {
		// main scss file
		const scss = `${App.configDir}/style.scss`;

		// target css file
		const css = `/tmp/my-style.css`;

		// compile, reset, apply
		Utils.exec(`sassc ${scss} ${css}`);
		App.resetCss();
		App.applyCss(css);
	},
);

App.config({
	style: css,
	windows: [sidebar, calendar],
});
