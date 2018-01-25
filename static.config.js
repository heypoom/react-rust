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

function webpack(config, args) {
  config.module.rules.push({
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
  })

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
