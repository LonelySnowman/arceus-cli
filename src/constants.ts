import { TemplateInfo } from "./types";

export const templates: Map<string, TemplateInfo> = new Map(
    [
        ["sv3-template", {
            name: "sv3-template",
            downloadUrl: 'git@github.com:LonelySnowman/sv3-template.git',
            description: 'vue3快速开发模板',
            branch: 'main'
        }],
        ["sv3-template-thin", {
            name: "sv3-template",
            downloadUrl: 'git@github.com:LonelySnowman/sv3-template.git',
            description: 'vue3快速开发模板(精简版)',
            branch: 'thin'
        }]
    ]
)
