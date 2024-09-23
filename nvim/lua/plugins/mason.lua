return {
    "williamboman/mason.nvim",
    dependencies = {
        "williamboman/mason-lspconfig.nvim",
        "neovim/nvim-lspconfig",
        "hrsh7th/nvim-cmp",
        "hrsh7th/cmp-nvim-lsp",
        "saadparwaiz1/cmp_luasnip",
        "FelipeLema/cmp-async-path",
        "L3MON4D3/LuaSnip",
        "onsails/lspkind.nvim",
    },
    init = function()
        require("mason").setup()
        require("mason-lspconfig").setup()

        local signs = { Error = " ", Warn = " ", Hint = "󰌶 ", Info = " " }
        for type, icon in pairs(signs) do
            local hl = "DiagnosticSign" .. type
            vim.fn.sign_define(hl, { text = icon, texthl = hl, numhl = hl })
        end

        vim.diagnostic.config({
            virtual_text = { true, prefix = "●" },
            signs = true,
            underline = true,
            update_in_insert = false,
            severity_sort = true,
        })

        local border = {
            { "╭", "FloatBorder" },
            { "─", "FloatBorder" },
            { "╮", "FloatBorder" },
            { "│", "FloatBorder" },
            { "╯", "FloatBorder" },
            { "─", "FloatBorder" },
            { "╰", "FloatBorder" },
            { "│", "FloatBorder" },
        }

        local orig_util_open_floating_preview = vim.lsp.util.open_floating_preview
        function vim.lsp.util.open_floating_preview(contents, syntax, opts, ...)
            opts = opts or {}
            opts.border = opts.border or border
            return orig_util_open_floating_preview(contents, syntax, opts, ...)
        end

        -- Add nvim-lspconfig plugin
        local lspconfig = require 'lspconfig'
        local on_attach = function(_, bufnr)
            local attach_opts = { silent = true, buffer = bufnr }
            vim.keymap.set('n', 'gD', vim.lsp.buf.declaration, attach_opts)
            vim.keymap.set('n', 'gd', vim.lsp.buf.definition, attach_opts)
            vim.keymap.set('n', 'K', vim.lsp.buf.hover, attach_opts)
            vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, attach_opts)
            vim.keymap.set('n', '<C-s>', vim.lsp.buf.signature_help, attach_opts)
            vim.keymap.set('n', '<leader>wa', vim.lsp.buf.add_workspace_folder, attach_opts)
            vim.keymap.set('n', '<leader>wr', vim.lsp.buf.remove_workspace_folder, attach_opts)
            vim.keymap.set('n', '<leader>wl', function() print(vim.inspect(vim.lsp.buf.list_workspace_folders())) end,
                attach_opts)
            vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename, attach_opts)
            vim.keymap.set('n', 'so', require('telescope.builtin').lsp_references, attach_opts)
        end

        -- nvim-cmp supports additional completion capabilities
        local capabilities = vim.lsp.protocol.make_client_capabilities()
        capabilities = require('cmp_nvim_lsp').default_capabilities(capabilities)

        vim.api.nvim_create_autocmd({ "CursorHold", "CursorHoldI" }, {
            group = vim.api.nvim_create_augroup("code_action_sign", { clear = true }),
            callback = function()
                require('code_action_utils').code_action_listener()
            end,
        })

        require("mason-lspconfig").setup_handlers({
            function(server_name)
                require("lspconfig")[server_name].setup({
                    on_attach = on_attach,
                    capabilities = capabilities,
                })
            end,

            ["lua_ls"] = function()
                require("lspconfig")["lua_ls"].setup({
                    diagnostics = {
                        globals = { "vim" },
                    },
                })
            end,
        })

        vim.keymap.set("n", "<leader>D", vim.diagnostic.open_float, {})

        -- auto completion --
        local luasnip = require("luasnip")
        local cmp = require("cmp")
        cmp.setup({
            preselect = "none",
            completion = {
                completeopt = "menu,menuone,noinsert,noselect",
            },
            snippet = {
                expand = function(args)
                    luasnip.lsp_expand(args.body)
                end,
            },
            mapping = cmp.mapping.preset.insert({
                ["<C-u>"] = cmp.mapping.scroll_docs(-4), -- Up
                ["<C-d>"] = cmp.mapping.scroll_docs(4),  -- Down
                -- C-b (back) C-f (forward) for snippet placeholder navigation.
                ["<C-Space>"] = cmp.mapping.complete(),
                ["<CR>"] = cmp.mapping.confirm({
                    select = true,
                }),
                ["<Tab>"] = cmp.mapping(function(fallback)
                    if cmp.visible() then
                        cmp.select_next_item()
                    elseif luasnip.expand_or_jumpable() then
                        luasnip.expand_or_jump()
                    else
                        fallback()
                    end
                end, { "i", "s" }),
                ["<S-Tab>"] = cmp.mapping(function(fallback)
                    if cmp.visible() then
                        cmp.select_prev_item()
                    elseif luasnip.jumpable(-1) then
                        luasnip.jump(-1)
                    else
                        fallback()
                    end
                end, { "i", "s" }),
            }),
            sources = {
                { name = "nvim_lsp" },
                { name = "luasnip" },
                { name = "async_path" },
            },
            window = {
                completion = cmp.config.window.bordered({
                    winhighlight = "Normal:Pmenu,FloatBorder:Pmenu,Search:None",
                    col_offset = -3,
                    side_padding = 0,
                }),
                documentation = cmp.config.window.bordered({
                    winhighlight = "Normal:Pmenu,FloatBorder:Pmenu,Search:None",
                    col_offset = -3,
                    side_padding = 0,
                }),
            },
            formatting = {
                fields = { "kind", "abbr", "menu" },
                format = function(entry, vim_item)
                    local kind = require("lspkind").cmp_format({ mode = "symbol_text", maxwidth = 50 })(entry, vim_item)
                    local strings = vim.split(kind.kind, "%s", { trimempty = true })
                    kind.kind = " " .. (strings[1] or "") .. " "
                    kind.menu = "    (" .. (strings[2] or "") .. ")"

                    return kind
                end,
            },
        })
    end,
}
