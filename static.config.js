import React from 'react'
import {extractCritical} from 'emotion-server'

const Document = ({Html, Head, Body, children, renderMeta}) => (
  <Html>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style dangerouslySetInnerHTML={{__html: renderMeta.css}} />
      <title>React 💕 Rust</title>
      <meta name="description" content="Discover the Tech Events in Thailand" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400"
        rel="stylesheet"
      />
    </Head>
    <Body>{children}</Body>
  </Html>
)
const wasmLoader = {
  test: /\.rs$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        compact: true,
      },
    },
    {
      loader: 'rust-native-wasm-loader',
      options: {
        gc: true,
        release: true,
        cargoWeb: true,
        name: 'static/wasm/[name].[hash:8].wasm',
      },
    },
  ],
}
function webpack(config, args) {
  const rules = config.module.rules[0]
  rules.oneOf.unshift(wasmLoader)

  config.node = {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }

  // rules.oneOf = [
  //   ...rules.oneOf.slice(0, rules.oneOf.length - 1),
  //   wasmLoader,
  //   ...rules.oneOf.slice(rules.oneOf.length - 1, rules.oneOf.length),
  // ]

  config.module.rules[0].oneOf.forEach(module => console.log(module))

  return config
}

export default {
  webpack,
  getSiteProps: () => ({
    title: 'WebAssembly with Rust',
  }),
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/routes/index',
    },
    {
      is404: true,
      component: 'src/routes/404',
    },
  ],
  renderToHtml: (render, Comp, meta) => {
    const html = render(<Comp />)
    meta.css = extractCritical(html).css
    return html
  },
  Document,
}
