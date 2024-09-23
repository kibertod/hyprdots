return {
    "mhartington/formatter.nvim",
    init = function()
        require("formatter").setup({
            logging = false,
            log_level = vim.log.levels.WARN,
            filetype = {
                lua = {
                    require("formatter.filetypes.lua").stylua,
                },
                rust = {
                    require("formatter.filetypes.rust").rustfmt,
                },
            },
        })
        local augroup = vim.api.nvim_create_augroup
        local autocmd = vim.api.nvim_create_autocmd
        augroup("__formatter__", { clear = true })
        autocmd("BufWritePost", {
            group = "__formatter__",
            command = ":FormatWrite",
        })
    end,
}
