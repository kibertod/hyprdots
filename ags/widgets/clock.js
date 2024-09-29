const time = Variable("", { poll: [1000, "date +%T"] });
const date = Variable("", { poll: [86400000, 'date +"%d.%m.%Y %A"'] });

export function Clock() {
	return Widget.Box({
		vertical: true,
		children: [
			Widget.Label({ name: "time", label: time.bind() }),
			Widget.Label({ name: "date", label: date.bind() }),
		],
	});
}
