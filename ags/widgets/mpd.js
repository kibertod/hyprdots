const isPlaying = Variable(false);
const artist = Variable("");
const title = Variable("");
const album = Variable("");
const cover = Variable("");
const file = Variable("");
const position = Variable(0);
const positionString = Variable("");
const shuffle = Variable(false);
const repeat = Variable(false);
const volume = Variable(0);

Utils.interval(500, () => {
	let status = Utils.exec(
		'mpc -p 7700 status "%state%,!,%currenttime%/%totaltime%,!,%percenttime%,!,%volume%,!,%random%,!,%repeat%"',
	).split(",!,");
	isPlaying.setValue(status[0] == "playing");
	positionString.setValue(status[1]);
	position.setValue(parseInt(status[2].slice(0, -1)) / 100);
	volume.setValue(parseInt(status[3].slice(0, -1)) / 100);
	shuffle.setValue(status[4] == "on");
	repeat.setValue(status[5] == "on");
	let song = Utils.exec(
		'mpc -p 7700 -f "%artist%,!,%title%,!,%album%,!,%file%" current',
	).split(",!,");
	artist.setValue(song[0]);
	title.setValue(song[1]);
	album.setValue(song[2]);
	if (file.value !== song[3]) {
		let coverExists =
			Utils.exec(
				`ffprobe -v error -select_streams v:0 -show_entries stream=index -of csv=p=0 \"/home/kibertod/Music/${song[3]}\"`,
			) == "1";
		if (coverExists) {
			Utils.exec(
				`bash -c 'mpc -p 7700 readpicture "${song[3].replace(/'/g, "'\\''")}" > /tmp/mpdcover'`,
			);
			cover.setValue(`/tmp/mpdcover`);
		} else {
			cover.setValue("/home/kibertod/.config/ags/cover.png");
		}
		file.setValue(song[3]);
	}
});

function Controls() {
	return Widget.Box({
		vertical: true,
		children: [
			Widget.Box([
				Widget.Slider({
					hexpand: true,
					draw_value: false,
					value: position.bind(),
					onChange: ({ value }) => {
						Utils.exec(`mpc -p 7700 seek ${parseInt(value * 100)}%`);
					},
				}),
			]),
			Widget.Box({
				children: [
					Widget.Label({ hexpand: true, label: "" }),
					Widget.Button({
						class_name: "player-prev",
						child: Widget.Label("󰒮"),
						onClicked: () => {
							Utils.exec("mpc -p 7700 prev");
						},
					}),
					Widget.Button({
						class_name: "player-play",
						child: Widget.Label({
							label: isPlaying.bind().transform((v) => (v ? "" : "")),
						}),
						onClicked: () => {
							Utils.exec("mpc -p 7700 toggle");
						},
					}),
					Widget.Button({
						class_name: "player-next",
						child: Widget.Label("󰒭"),
						onClicked: () => {
							Utils.exec("mpc -p 7700 next");
						},
					}),
					Widget.Label({ hexpand: true, label: "" }),
				],
			}),
		],
	});
}

function otherControls() {
	return Widget.Box({
		vertical: true,
		children: [
			Widget.Box({
				hexpand: true,
				homogeneous: true,
				css: "padding-right: 12px;",
				spacing: 20,
				children: [
					Widget.Button({
						child: Widget.Label(""),
						onClicked: () => {
							Utils.execAsync("mpc -p 7700 random");
						},
						class_name: shuffle
							.bind()
							.transform((s) => (s ? "shuffle active" : "shuffle")),
					}),
					Widget.Button({
						child: Widget.Label(""),
						onClicked: () => {
							Utils.execAsync("mpc -p 7700 repeat");
						},
						class_name: repeat
							.bind()
							.transform((r) => (r ? "repeat active" : "repeat")),
					}),
				],
			}),
			Widget.Box([
				Widget.Label("󰕾"),
				Widget.Slider({
					hexpand: true,
					draw_value: false,
					value: volume.bind(),
					onChange: ({ value }) =>
						Utils.execAsync(`mpc -p 7700 volume ${parseInt(value * 100)}`),
				}),
			]),
		],
	});
}

function Info() {
	return Widget.Box({
		css: "min-height: 90px;",
		spacing: 20,
		children: [
			Widget.Box({
				hexpand: true,
				vertical: true,
				children: [
					Widget.Label({
						xalign: 0,
						wrap: true,
						class_name: "player-title",
						label: title.bind(),
					}),
					Widget.Label({
						xalign: 0,
						wrap: true,
						class_name: "player-artist",
						label: artist.bind(),
					}),
					Widget.Label({
						xalign: 0,
						wrap: true,
						class_name: "player-album",
						label: album.bind(),
					}),
					Widget.Label({
						xalign: 0,
						label: positionString.bind(),
					}),
				],
			}),
			otherControls(),
		],
	});
}

function Cover() {
	return Widget.Box({
		class_name: "img",
		setup: (self) =>
			self.hook(cover, (self) => {
				self.css = `background-image: url('${cover.value}');`;
			}),
	});
}

export function Mpd() {
	return Widget.Box({
		vertical: true,
		children: [
			Widget.Box({
				children: [Widget.Box({ vertical: true, children: [Cover()] }), Info()],
			}),
			Controls(),
		],
	});
}
