vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1

if vim.loader and vim.fn.has("nvim-0.9.1") == 1 then
    vim.loader.enable()
end

vim.opt.history = 1000
vim.opt.termguicolors = true
vim.opt.laststatus = 3
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.shiftwidth = 4
vim.opt.tabstop = 4
vim.opt.expandtab = true
vim.cmd("set colorcolumn=100")

vim.g.mapleader = " "

require("config.lazy")

vim.cmd(":set nowrap")
