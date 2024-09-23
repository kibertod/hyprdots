return {
    "nvim-lualine/lualine.nvim",
    dependencies = { "nvim-tree/nvim-web-devicons", "Asheq/close-buffers.vim" },
    init = function()
        local lualine = require("lualine")
        local lsp_name = function()
            local msg = "No Active Lsp"
            local buf_ft = vim.api.nvim_buf_get_option(0, "filetype")
            local clients = vim.lsp.get_active_clients()
            if next(clients) == nil then
                return msg
            end
            for _, client in ipairs(clients) do
                local filetypes = client.config.filetypes
                if filetypes and vim.fn.index(filetypes, buf_ft) ~= -1 then
                    return client.name
                end
            end
            return msg
        end
        local config = {
            options = {
                section_separators = { right = "", left = "" },
                component_separators = { right = "", left = "" },
            },
            tabline = {
                lualine_a = {
                    {
                        "buffers",
                        use_mode_colors = true,
                        symbols = {
                            modified = " ●",
                            alternate_file = "",
                            directory = "",
                        },
                    },
                },
                lualine_b = {},
                lualine_c = {},
                lualine_x = {},
                lualine_y = {},
                lualine_z = {},
            },
            sections = {
                lualine_a = {
                    function()
                        return ""
                    end,
                },
                lualine_b = {
                    "filename",
                    "branch",
                    {
                        "diff",
                        symbols = { added = " ", modified = "󰝤 ", removed = " " },
                    },
                },
                lualine_c = {
                    { "diagnostics", symbols = { error = " ", warn = " ", info = " " } },
                },
                lualine_x = {},
                lualine_y = { "progress", "location" },
                lualine_z = {},
            },
        }
        lualine.setup(config)
        vim.keymap.set("n", ".", "<cmd>bn<CR>")
        vim.keymap.set("n", ",", "<cmd>bp<CR>")
        vim.keymap.set("n", "<leader>bc", "<cmd>Bdelete hidden<CR>")
    end,
}
