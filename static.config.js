import React from 'react'
import {extractCritical} from 'emotion-server'
import fs from 'fs'

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

// This uses `rust-native-wasm-loader` to load Rust code!
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

const nodeConfig = {
  dgram: 'empty',
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
  child_process: 'empty',
}

function webpack(config, args) {
  config.module.rules[0].oneOf.unshift(wasmLoader)
  config.node = nodeConfig
  return config
}

async function getRoutes() {
  const routes = fs.readdirSync('src/routes')
  return routes.map(route => {
    const name = route.substr(0, route.length - 2)
    if (name === 'index') {
      return {path: '/', component: 'src/routes/index'}
    } else if (name === '404') {
      return {is404: true, component: 'src/routes/404'}
    }

    return {path: '/' + name, component: 'src/routes/' + name}
  })
}

export default {
  webpack,
  getSiteProps: () => ({
    title: 'WebAssembly with Rust',
  }),
  getRoutes,
  renderToHtml: (render, Comp, meta) => {
    const html = render(<Comp />)
    meta.css = extractCritical(html).css
    return html
  },
  Document,
}
