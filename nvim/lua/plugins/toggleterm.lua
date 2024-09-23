return {
	"akinsho/toggleterm.nvim",
	version = "*",
	opts = {},
	init = function()
		vim.keymap.set("n", "<C-t>", "<cmd>ToggleTerm<CR>")
		vim.keymap.set("t", "<C-t>", "<cmd>ToggleTerm<CR>")
	end,
}
