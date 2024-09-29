import { Dropdown } from "../elements/dropdown.js";

const audio = await Service.import("audio");

function selector(type, revealed, icon) {
	return Widget.Box({
		name: type,
		children: [
			Dropdown(
				Widget.Box({
					children: [
						Widget.Label({
							label: audio[type].description,
							hexpand: true,
							xalign: 0,
						}),
						Widget.Label(icon),
					],
				}),
				audio[`${type}s`]
					.filter((speaker) => speaker.name != audio[type].name)
					.map((speaker) =>
						Widget.Button({
							child: Widget.Label(speaker.description),
							onClicked: () => {
								audio[type] = speaker;
							},
						}),
					),
				revealed,
			),
		],
	});
}

function muted(type, icon) {
	return Widget.Box({
		vertical: true,
		children: [
			Widget.Button({
				name: `${type}-muted`,
				child: Widget.Label(icon),
				class_name: audio[type].isMuted ? "active" : "",
				onClicked: () => {
					audio[type].isMuted = !audio[type].isMuted;
				},
			}),
		],
	});
}

function volume(type) {
	return Widget.Slider({
		name: `${type}-slider`,
		value: audio[type].bind("volume"),
		hexpand: true,
		drawValue: false,
		onChange: ({ value }) => {
			audio[type].volume = value;
		},
	});
}

export function Audio() {
	return Widget.Box({
		class_name: "audio-input",
		vertical: true,
		css: "min-height: 2px; min-width: 2px;",
		visible: true,
		children: [
			Widget.Label("Speaker"),
			Widget.Box({
				css: "margin-top: 10px;",
				children: [selector("speaker", false, "󰓃"), muted("speaker", "󰓄")],
				spacing: 20,
			}),
			volume("speaker"),
			Widget.Label("Microphone"),
			Widget.Box({
				css: "margin-top: 10px;",
				children: [selector("microphone", false, "󰓃"), muted("speaker", "󰓄")],
				spacing: 20,
			}),
			volume("microphone"),
		],
		setup: (self) =>
			self.hook(audio, (self) => {
				let iRevealed =
					self.children[1].children[0].children[0].children[1].revealChild;
				let oRevealed =
					self.children[4].children[0].children[0].children[1].revealChild;
				self.children[1].children = [
					selector("speaker", iRevealed, "󰓃"),
					muted("speaker", "󰓄"),
				];
				self.children[4].children = [
					selector("microphone", oRevealed, ""),
					muted("microphone", ""),
				];
			}),
	});
}
