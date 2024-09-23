return {
    "rebelot/kanagawa.nvim",
    dependencies = { "xiyaowong/transparent.nvim", "norcalli/nvim-colorizer.lua" },
    config = function()
        vim.cmd("colorscheme kanagawa-dragon")
        require("colorizer").setup()

        local colors = {
            gray = "#969896",
            fg = "#C5C8C6",
            bg = "#151515",
            bg_selected = "#1A1A1A",
            purple = "#B294BB",
            red = "#CC6666",
            green = "#8C9440",
            orange = "#DE935F",
            yellow = "#F0C674",
            blue = "#81A2BE",
            cyan = "#8ABEB7",
            black = "#373B41",
        }

        -- tagbar
        vim.api.nvim_set_hl(0, "TagbarFoldIcon", { fg = colors.orange })
        vim.api.nvim_set_hl(0, "TagbarScope", { fg = colors.purple })
        vim.api.nvim_set_hl(0, "TagbarType", { fg = colors.blue })
        vim.api.nvim_set_hl(0, "TagbarSignature", { fg = colors.fg })
        vim.api.nvim_set_hl(0, "TagbarHighlight", { fg = colors.fg, bg = "#303030" })
        vim.api.nvim_set_hl(0, "TagbarVisibilityPublic", { fg = colors.green })
        vim.api.nvim_set_hl(0, "TagbarVisibilityProtected", { fg = colors.yellow })
        vim.api.nvim_set_hl(0, "TagbarVisibilityPrivate", { fg = colors.red })

        -- lsp hovers
        vim.api.nvim_set_hl(0, "NormalFloat", { link = "Normal" })
        vim.api.nvim_set_hl(0, "FloatBorder", { bg = colors.bg })
        -- Customization for Pmenu
        vim.api.nvim_set_hl(0, "PmenuSel", { bg = colors.bg_selected, fg = "NONE" })
        vim.api.nvim_set_hl(0, "Pmenu", { fg = colors.fg, bg = colors.bg })

        vim.api.nvim_set_hl(0, "CmpItemAbbrDeprecated", { fg = colors.fg, bg = "NONE", strikethrough = true })
        vim.api.nvim_set_hl(0, "CmpItemAbbrMatch", { fg = colors.blue, bg = "NONE", bold = true })
        vim.api.nvim_set_hl(0, "CmpItemAbbrMatchFuzzy", { fg = colors.blue, bg = "NONE", bold = true })
        vim.api.nvim_set_hl(0, "CmpItemMenu", { fg = colors.purple, bg = "NONE", italic = true })

        vim.api.nvim_set_hl(0, "CmpItemKindField", { fg = colors.bg, bg = colors.gray })
        vim.api.nvim_set_hl(0, "CmpItemKindProperty", { fg = colors.bg, bg = colors.gray })
        vim.api.nvim_set_hl(0, "CmpItemKindEvent", { fg = colors.bg, bg = colors.gray })

        vim.api.nvim_set_hl(0, "CmpItemKindText", { fg = colors.bg, bg = colors.blue })
        vim.api.nvim_set_hl(0, "CmpItemKindKeyword", { fg = colors.bg, bg = colors.blue })
        vim.api.nvim_set_hl(0, "CmpItemKindValue", { fg = colors.bg, bg = colors.blue })
        vim.api.nvim_set_hl(0, "CmpItemKindEnumMember", { fg = colors.bg, bg = colors.blue })
        vim.api.nvim_set_hl(0, "CmpItemKindTypeParameter", { fg = colors.bg, bg = colors.blue })
        vim.api.nvim_set_hl(0, "CmpItemKindColor", { fg = colors.bg, bg = colors.blue })

        vim.api.nvim_set_hl(0, "CmpItemKindConstant", { fg = colors.bg, bg = colors.purple })
        vim.api.nvim_set_hl(0, "CmpItemKindConstructor", { fg = colors.bg, bg = colors.purple })
        vim.api.nvim_set_hl(0, "CmpItemKindReference", { fg = colors.bg, bg = colors.purple })

        vim.api.nvim_set_hl(0, "CmpItemKindStruct", { fg = colors.bg, bg = colors.orange })
        vim.api.nvim_set_hl(0, "CmpItemKindClass", { fg = colors.bg, bg = colors.orange })
        vim.api.nvim_set_hl(0, "CmpItemKindEnum", { fg = colors.bg, bg = colors.orange })
        vim.api.nvim_set_hl(0, "CmpItemKindInterface", { fg = colors.bg, bg = colors.orange })

        vim.api.nvim_set_hl(0, "CmpItemKindFunction", { fg = colors.bg, bg = colors.red })
        vim.api.nvim_set_hl(0, "CmpItemKindOperator", { fg = colors.bg, bg = colors.red })
        vim.api.nvim_set_hl(0, "CmpItemKindMethod", { fg = colors.bg, bg = colors.red })

        vim.api.nvim_set_hl(0, "CmpItemKindModule", { fg = colors.bg, bg = colors.green })
        vim.api.nvim_set_hl(0, "CmpItemKindVariable", { fg = colors.bg, bg = colors.green })
        vim.api.nvim_set_hl(0, "CmpItemKindFile", { fg = colors.bg, bg = colors.green })

        vim.api.nvim_set_hl(0, "CmpItemKindUnit", { fg = colors.fg, bg = colors.black })
        vim.api.nvim_set_hl(0, "CmpItemKindSnippet", { fg = colors.fg, bg = colors.black })
        vim.api.nvim_set_hl(0, "CmpItemKindFolder", { fg = colors.fg, bg = colors.black })
    end,
}
