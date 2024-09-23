return {
	"preservim/tagbar",
	version = "*",
	opts = {},
	init = function()
		vim.keymap.set("n", "<leader>tg", "<cmd>TagbarToggle<CR>")
	end,
	config = function()
		vim.cmd("let g:tagbar_sort = 0")
		vim.cmd("let g:tagbar_compact = 1")
		vim.cmd("let g:tagbar_autofocus = 1")
		vim.cmd("let g:tagbar_autoclose = 1")
		vim.cmd([[let g:tagbar_scopestrs = {
            \    'class': "󰠱 class",
            \    'const': "󰏿 constant",
            \    'constant': "󰏿 constant",
            \    'enum': " enum",
            \    'field': "󰇽 field",
            \    'function': "󰊕 function",
            \    'implementation': " implementation",
            \    'interface': " interface",
            \    'struct': " struct",
            \    'member': "󰇽 member",
            \    'method': "󰊕 method",
            \    'variable': "󰂡 variable",
            \    'module': "󰆧 module",
            \ }]])
	end,
}
