export function Button(child, onClick, class_name) {
	return Widget.Button({
		child: child,
		onClicked: onClick,
		class_name: class_name,
	});
}
