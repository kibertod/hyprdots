import { Button } from "../elements/button.js";

export function Dropdown(child, items, revealed) {
	let revealer = Widget.Revealer({
		revealChild: revealed,
		transitionDuration: 400,
		transition: "slide_down",
		child: Widget.Box({
			class_name: "dropdown-items",
			vertical: true,
			visible: true,
			children: items,
		}),
	});
	return Widget.Box({
		class_name: revealed ? "dropdown active" : "dropdown",
		vertical: true,
		css: "min-height: 2px; min-width: 2px;",
		visible: true,
		children: [
			Button(
				child,
				(self) => {
					revealer.revealChild = !revealer.revealChild;
					self.parent.class_name = revealer.revealChild
						? "dropdown active"
						: "dropdown";
				},
				"dropdown-toggle",
			),
			revealer,
		],
	});
}
