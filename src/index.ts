import path from 'path'

import {
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  services,
  workspace,
} from 'coc.nvim'

interface CocUnocssConfig {
  enable: boolean
}

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration().get('unocss') as CocUnocssConfig

  if (config.enable === false) {
    return
  }

  const serverModule = context.asAbsolutePath(
    path.join('node_modules', 'unocss-language-server', 'bin', 'index.js')
  )

  const serverOptions: ServerOptions = {
    module: serverModule,
    transport: TransportKind.ipc,
    args: ['--node-ipc'],
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      'vue',
      'html',
      'svelte',
      'javascript',
      'javascriptreact',
      'typescript',
      'typescriptreact',
    ],
  }

  const client = new LanguageClient(
    'unocss',
    'UnoCSS Language Server',
    serverOptions,
    clientOptions
  )

  context.subscriptions.push(services.registLanguageClient(client))
}
